package ru.dunhuatv.app.presentation.home

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.focus.onFocusChanged
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.tv.foundation.lazy.list.TvLazyRow
import androidx.tv.foundation.lazy.list.TvLazyListState
import androidx.tv.foundation.lazy.list.rememberTvLazyListState
import androidx.tv.foundation.lazy.list.items
import androidx.tv.material3.Card
import androidx.tv.material3.CardDefaults
import androidx.tv.material3.MaterialTheme
import androidx.tv.material3.Text
import coil.compose.AsyncImage

/**
 * Главный экран приложения (HomeScreen).
 * Горизонтальные ряды с категориями: «Новые серии», «Популярное», «Жанры».
 * Оптимизирован для Android TV с D-pad навигацией.
 */
@Composable
fun HomeScreen(
    onSeriesClick: (String) -> Unit,
    onSettingsClick: () -> Unit,
    viewModel: HomeViewModel = hiltViewModel()
) {
    val uiState by viewModel.uiState.collectAsState()

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF0A0A1A))
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 48.dp, vertical = 32.dp)
        ) {
            // Header
            Text(
                text = "Дунхуа ТВ",
                fontSize = 42.sp,
                fontWeight = FontWeight.Black,
                color = Color.White
            )
            Text(
                text = "Китайское аниме на вашем телевизоре",
                fontSize = 18.sp,
                color = Color(0xFF8888AA),
                modifier = Modifier.padding(top = 4.dp, bottom = 32.dp)
            )

            // Featured Row
            if (uiState.featured.isNotEmpty()) {
                ContentRow(
                    title = "🔥 Рекомендуем",
                    series = uiState.featured,
                    onSeriesClick = onSeriesClick,
                    isFeatured = true
                )
            }

            Spacer(modifier = Modifier.height(24.dp))

            // Top Rated Row
            if (uiState.topRated.isNotEmpty()) {
                ContentRow(
                    title = "⭐ Топ рейтинга",
                    series = uiState.topRated,
                    onSeriesClick = onSeriesClick
                )
            }

            Spacer(modifier = Modifier.height(24.dp))

            // New Releases Row
            if (uiState.newReleases.isNotEmpty()) {
                ContentRow(
                    title = "✨ Новинки",
                    series = uiState.newReleases,
                    onSeriesClick = onSeriesClick
                )
            }
        }

        // Loading indicator
        if (uiState.isLoading) {
            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                Text("Загрузка...", color = Color.White, fontSize = 20.sp)
            }
        }
    }
}

/**
 * Горизонтальный ряд контента с карточками.
 */
@Composable
fun ContentRow(
    title: String,
    series: List<ru.dunhuatv.app.domain.model.Series>,
    onSeriesClick: (String) -> Unit,
    isFeatured: Boolean = false
) {
    val listState = rememberTvLazyListState()

    Column {
        Text(
            text = title,
            fontSize = 24.sp,
            fontWeight = FontWeight.Bold,
            color = Color.White,
            modifier = Modifier.padding(bottom = 16.dp)
        )

        TvLazyRow(
            state = listState,
            horizontalArrangement = Arrangement.spacedBy(16.dp),
            contentPadding = PaddingValues(horizontal = 4.dp)
        ) {
            items(series) { item ->
                SeriesCard(
                    series = item,
                    onClick = { onSeriesClick(item.slug) },
                    isFeatured = isFeatured
                )
            }
        }
    }
}

/**
 * Карточка сериала с TV-фокусом.
 * При фокусе увеличивается (scale 1.1x) и получает яркую рамку.
 */
@Composable
fun SeriesCard(
    series: ru.dunhuatv.app.domain.model.Series,
    onClick: () -> Unit,
    isFeatured: Boolean = false
) {
    var isFocused by remember { mutableStateOf(false) }
    val focusRequester = remember { FocusRequester() }

    val cardWidth = if (isFeatured) 360.dp else 200.dp
    val cardHeight = if (isFeatured) 200.dp else 280.dp

    Card(
        onClick = onClick,
        modifier = Modifier
            .width(cardWidth)
            .height(cardHeight)
            .focusRequester(focusRequester)
            .onFocusChanged { isFocused = it.isFocused }
            .scale(if (isFocused) 1.08f else 1f)
            .border(
                width = if (isFocused) 3.dp else 0.dp,
                color = if (isFocused) Color(0xFFE94560) else Color.Transparent,
                shape = RoundedCornerShape(16.dp)
            ),
        shape = androidx.tv.material3.CardDefaults.shape(
            focusedShape = RoundedCornerShape(16.dp)
        ),
        colors = CardDefaults.colors(
            containerColor = Color(0xFF1E1E3A),
            focusedContainerColor = Color(0xFF2A2A50)
        )
    ) {
        Box {
            // Poster
            AsyncImage(
                model = series.posterUrl,
                contentDescription = series.title,
                contentScale = ContentScale.Crop,
                modifier = Modifier.fillMaxSize()
            )

            // Gradient overlay
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .background(
                        Brush.verticalGradient(
                            colors = listOf(
                                Color.Transparent,
                                Color.Black.copy(alpha = 0.8f)
                            ),
                            startY = 100f
                        )
                    )
            )

            // Content overlay
            Column(
                modifier = Modifier
                    .align(Alignment.BottomStart)
                    .padding(12.dp)
            ) {
                Text(
                    text = series.title,
                    fontSize = if (isFeatured) 18.sp else 14.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.White,
                    maxLines = 2
                )
                Row(
                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                    modifier = Modifier.padding(top = 4.dp)
                ) {
                    Text(
                        text = "★ ${series.rating}",
                        fontSize = 12.sp,
                        color = Color(0xFFFFD700),
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = series.year.toString(),
                        fontSize = 12.sp,
                        color = Color.White.copy(alpha = 0.7f)
                    )
                }
            }

            // Rating badge
            Box(
                modifier = Modifier
                    .align(Alignment.TopStart)
                    .padding(8.dp)
                    .clip(RoundedCornerShape(6.dp))
                    .background(
                        Brush.linearGradient(
                            listOf(Color(0xFFFFD700), Color(0xFFFF8C00))
                        )
                    )
                    .padding(horizontal = 8.dp, vertical = 4.dp)
            ) {
                Text(
                    text = "★ ${series.rating}",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.Black
                )
            }
        }
    }
}
