package ru.dunhuatv.app.presentation.player

import android.view.KeyEvent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.focus.onFocusChanged
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.input.key.*
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.media3.common.MediaItem
import androidx.media3.common.PlaybackParameters
import androidx.media3.exoplayer.ExoPlayer
import androidx.media3.ui.PlayerView
import androidx.tv.material3.Icon
import androidx.tv.material3.IconButton
import androidx.tv.material3.Text
import kotlinx.coroutines.delay

/**
 * Экран видеоплеера с полной поддержкой D-pad навигации.
 * Использует Media3 ExoPlayer для воспроизведения.
 * 
 * Поддержка пульта:
 * - D-pad: навигация по элементам управления
 * - Play/Pause: воспроизведение/пауза
 * - Fast Forward/Rewind: перемотка +10с/-10с
 * - Back: возврат на предыдущий экран
 */
@Composable
fun PlayerScreen(
    slug: String,
    startEpisode: Int,
    onBackClick: () -> Unit,
    onNextEpisode: (Int) -> Unit,
    viewModel: PlayerViewModel = hiltViewModel()
) {
    val context = LocalContext.current
    val uiState by viewModel.uiState.collectAsState()
    
    var isPlaying by remember { mutableStateOf(true) }
    var showControls by remember { mutableStateOf(true) }
    var currentEpisode by remember { mutableStateOf(startEpisode) }
    var currentTime by remember { mutableStateOf(0L) }
    var duration by remember { mutableStateOf(0L) }
    
    // ExoPlayer instance
    val exoPlayer = remember {
        ExoPlayer.Builder(context).build().apply {
            playWhenReady = true
            // Demo video URL (замените на реальный URL из парсинга)
            val mediaItem = MediaItem.fromUri(
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            )
            setMediaItem(mediaItem)
            prepare()
        }
    }

    // Auto-hide controls
    LaunchedEffect(showControls, isPlaying) {
        if (showControls && isPlaying) {
            delay(4000)
            showControls = false
        }
    }

    // Track playback position
    LaunchedEffect(exoPlayer) {
        while (true) {
            currentTime = exoPlayer.currentPosition
            duration = exoPlayer.duration.coerceAtLeast(0)
            delay(500)
        }
    }

    // Handle D-pad key events
    val focusRequester = remember { FocusRequester() }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.Black)
            .onKeyEvent { keyEvent ->
                if (keyEvent.type == KeyEventType.KeyDown) {
                    showControls = true
                    when (keyEvent.key.keyCode) {
                        Key.DirectionCenter, Key.Spacebar -> {
                            isPlaying = !isPlaying
                            exoPlayer.playWhenReady = isPlaying
                            true
                        }
                        Key.DirectionRight -> {
                            exoPlayer.seekTo(exoPlayer.currentPosition + 10_000)
                            true
                        }
                        Key.DirectionLeft -> {
                            exoPlayer.seekTo((exoPlayer.currentPosition - 10_000).coerceAtLeast(0))
                            true
                        }
                        Key.DirectionUp -> {
                            val vol = (exoPlayer.volume + 0.05f).coerceAtMost(1f)
                            exoPlayer.volume = vol
                            true
                        }
                        Key.DirectionDown -> {
                            val vol = (exoPlayer.volume - 0.05f).coerceAtLeast(0f)
                            exoPlayer.volume = vol
                            true
                        }
                        Key.Back, Key.Escape -> {
                            onBackClick()
                            true
                        }
                        Key.N -> {
                            if (currentEpisode < (uiState.series?.totalEpisodes ?: 1)) {
                                currentEpisode++
                                onNextEpisode(currentEpisode)
                            }
                            true
                        }
                        else -> false
                    }
                } else false
            }
            .focusRequester(focusRequester)
    ) {
        // Video Player View
        AndroidView(
            factory = { ctx ->
                PlayerView(ctx).apply {
                    player = exoPlayer
                    useController = false // Custom controls
                }
            },
            modifier = Modifier.fillMaxSize()
        )

        // Controls Overlay
        if (showControls) {
            // Top bar
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .align(Alignment.TopCenter)
                    .background(
                        androidx.compose.ui.graphics.Brush.verticalGradient(
                            listOf(Color.Black.copy(alpha = 0.8f), Color.Transparent)
                        )
                    )
                    .padding(24.dp)
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    IconButton(onClick = onBackClick) {
                        Icon(
                            Icons.Default.ArrowBack,
                            contentDescription = "Назад",
                            tint = Color.White,
                            modifier = Modifier.size(32.dp)
                        )
                    }
                    Column {
                        Text(
                            text = uiState.series?.title ?: "Загрузка...",
                            fontSize = 22.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color.White
                        )
                        Text(
                            text = "Серия $currentEpisode",
                            fontSize = 14.sp,
                            color = Color.White.copy(alpha = 0.7f)
                        )
                    }
                }
            }

            // Center controls
            Row(
                modifier = Modifier
                    .align(Alignment.Center)
                    .padding(32.dp),
                horizontalArrangement = Arrangement.spacedBy(32.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                // Rewind
                TvControlButton(
                    icon = Icons.Default.FastRewind,
                    onClick = { exoPlayer.seekTo((exoPlayer.currentPosition - 10_000).coerceAtLeast(0)) }
                )
                
                // Play/Pause
                TvControlButton(
                    icon = if (isPlaying) Icons.Default.Pause else Icons.Default.PlayArrow,
                    onClick = {
                        isPlaying = !isPlaying
                        exoPlayer.playWhenReady = isPlaying
                    },
                    isPrimary = true
                )
                
                // Forward
                TvControlButton(
                    icon = Icons.Default.FastForward,
                    onClick = { exoPlayer.seekTo(exoPlayer.currentPosition + 10_000) }
                )
            }

            // Bottom bar with progress
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .align(Alignment.BottomCenter)
                    .background(
                        androidx.compose.ui.graphics.Brush.verticalGradient(
                            listOf(Color.Transparent, Color.Black.copy(alpha = 0.8f))
                        )
                    )
                    .padding(24.dp)
            ) {
                // Progress bar
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(6.dp)
                        .clip(RoundedCornerShape(3.dp))
                        .background(Color.White.copy(alpha = 0.2f))
                ) {
                    if (duration > 0) {
                        Box(
                            modifier = Modifier
                                .fillMaxHeight()
                                .width(
                                    (currentTime.toFloat() / duration.toFloat() * 100).let { pct ->
                                        // Use fraction of parent width
                                        androidx.compose.ui.unit.Dp(pct / 100 * 1000)
                                    }
                                )
                                .clip(RoundedCornerShape(3.dp))
                                .background(Color(0xFFE94560))
                        )
                    }
                }

                Spacer(modifier = Modifier.height(8.dp))

                // Time and episode info
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "${formatTime(currentTime)} / ${formatTime(duration)}",
                        fontSize = 14.sp,
                        color = Color.White.copy(alpha = 0.7f)
                    )
                    Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                        // Previous episode
                        IconButton(
                            onClick = {
                                if (currentEpisode > 1) {
                                    currentEpisode--
                                    onNextEpisode(currentEpisode)
                                }
                            },
                            enabled = currentEpisode > 1
                        ) {
                            Icon(Icons.Default.SkipPrevious, "Предыдущая", tint = Color.White)
                        }
                        // Next episode
                        IconButton(
                            onClick = {
                                if (currentEpisode < (uiState.series?.totalEpisodes ?: 1)) {
                                    currentEpisode++
                                    onNextEpisode(currentEpisode)
                                }
                            },
                            enabled = currentEpisode < (uiState.series?.totalEpisodes ?: 1)
                        ) {
                            Icon(Icons.Default.SkipNext, "Следующая", tint = Color.White)
                        }
                    }
                }
            }
        }
    }

    // Cleanup
    androidx.compose.runtime.DisposableEffect(Unit) {
        onDispose {
            exoPlayer.release()
        }
    }
}

/**
 * Кнопка управления плеером с TV-фокусом.
 */
@Composable
fun TvControlButton(
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    onClick: () -> Unit,
    isPrimary: Boolean = false
) {
    var isFocused by remember { mutableStateOf(false) }

    IconButton(
        onClick = onClick,
        modifier = Modifier
            .size(if (isPrimary) 80.dp else 56.dp)
            .onFocusChanged { isFocused = it.isFocused }
            .clip(RoundedCornerShape(50))
            .background(
                if (isPrimary) Color(0xFFE94560)
                else Color.White.copy(alpha = if (isFocused) 0.2f else 0.1f)
            )
    ) {
        Icon(
            icon,
            contentDescription = null,
            tint = Color.White,
            modifier = Modifier.size(if (isPrimary) 40.dp else 28.dp)
        )
    }
}

/**
 * Форматирование времени из миллисекунд в mm:ss или hh:mm:ss.
 */
fun formatTime(ms: Long): String {
    val totalSeconds = ms / 1000
    val hours = totalSeconds / 3600
    val minutes = (totalSeconds % 3600) / 60
    val seconds = totalSeconds % 60
    
    return if (hours > 0) {
        String.format("%d:%02d:%02d", hours, minutes, seconds)
    } else {
        String.format("%d:%02d", minutes, seconds)
    }
}
