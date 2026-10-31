package ru.dunhuatv.app.data.remote

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jsoup.Jsoup
import ru.dunhuatv.app.domain.model.*

/**
 * Парсер HTML-страниц dunhuatv.ru с помощью Jsoup.
 * 
 * Извлекает:
 * - Список мультсериалов с постерами, рейтингами, жанрами
 * - Ссылки на страницы серий
 * - Описание и метаданные
 * 
 * Примечание: Структура сайта может измениться.
 * При ошибках парсинга обновите CSS-селекторы.
 */
class DunhuaHtmlParser {

    companion object {
        private const val BASE_URL = "https://dunhuatv.ru"
        private const val USER_AGENT = "Mozilla/5.0 (Linux; Android 12; Android TV) AppleWebKit/537.36"
    }

    /**
     * Парсинг главной страницы для получения списка сериалов.
     */
    suspend fun parseHomePage(): List<Series> = withContext(Dispatchers.IO) {
        try {
            val doc = Jsoup.connect(BASE_URL)
                .userAgent(USER_AGENT)
                .timeout(15000)
                .get()

            val seriesList = mutableListOf<Series>()

            // Парсим карточки сериалов
            // Селекторы основаны на текущей структуре сайта dunhuatv.ru
            val cards = doc.select(".content .shortstory, .movie-list .item, article")
            
            cards.forEach { card ->
                try {
                    val title = card.select("a[href*=smotret], .title a").text().ifEmpty {
                        card.select(".title, h2, h3").text()
                    }
                    
                    val link = card.select("a[href*=smotret], a[href*=html]").attr("href").ifEmpty {
                        card.select("a").attr("href")
                    }
                    
                    val poster = card.select("img").attr("src").ifEmpty {
                        card.select("img").attr("data-src")
                    }
                    
                    if (title.isNotBlank() && link.isNotBlank()) {
                        val slug = extractSlug(link)
                        val rating = extractRating(card.text())
                        val year = extractYear(card.text())
                        val age = extractAge(card.text())
                        val genres = extractGenres(card.text())
                        
                        seriesList.add(
                            Series(
                                id = seriesList.size + 1,
                                title = title,
                                slug = slug,
                                posterUrl = if (poster.startsWith("http")) poster else "$BASE_URL$poster",
                                rating = rating,
                                ageRating = age,
                                duration = extractDuration(card.text()),
                                year = year,
                                genres = genres,
                                description = card.select(".description, .short-desc, p").text(),
                                status = if (card.text().contains("Онгоинг", ignoreCase = true)) 
                                    SeriesStatus.ONGOING else SeriesStatus.COMPLETED,
                                totalEpisodes = null
                            )
                        )
                    }
                } catch (e: Exception) {
                    // Пропускаем карточки с ошибками парсинга
                    continue
                }
            }

            seriesList
        } catch (e: Exception) {
            emptyList()
        }
    }

    /**
     * Парсинг страницы сериала для получения списка серий.
     */
    suspend fun parseSeriesPage(url: String): List<Episode> = withContext(Dispatchers.IO) {
        try {
            val doc = Jsoup.connect(url)
                .userAgent(USER_AGENT)
                .timeout(15000)
                .get()

            val episodes = mutableListOf<Episode>()

            // Ищем ссылки на серии (обычно в плеере или списке)
            val episodeLinks = doc.select(".playlist a, .episodes a, .series-list a, [data-episode]")
            
            episodeLinks.forEachIndexed { index, link ->
                val epTitle = link.text().ifBlank { "Серия ${index + 1}" }
                val epUrl = link.attr("href").let { 
                    if (it.startsWith("http")) it else "$BASE_URL$it" 
                }
                
                episodes.add(
                    Episode(
                        id = index + 1,
                        number = index + 1,
                        title = epTitle,
                        videoUrl = epUrl
                    )
                )
            }

            // Если не нашли через плейлист, ищем iframe с видео
            if (episodes.isEmpty()) {
                val iframe = doc.select("iframe[src*=video], iframe[src*=player], iframe[src*=kodik]")
                if (iframe.isNotEmpty()) {
                    episodes.add(
                        Episode(
                            id = 1,
                            number = 1,
                            title = "Серия 1",
                            videoUrl = iframe.attr("src")
                        )
                    )
                }
            }

            episodes
        } catch (e: Exception) {
            emptyList()
        }
    }

    /**
     * Извлечение video URL из страницы с плеером.
     */
    suspend fun extractVideoUrl(url: String): String? = withContext(Dispatchers.IO) {
        try {
            val doc = Jsoup.connect(url)
                .userAgent(USER_AGENT)
                .timeout(15000)
                .get()

            // Ищем источник видео в iframe или data-атрибутах
            val iframeSrc = doc.select("iframe").attr("src")
            if (iframeSrc.isNotBlank()) return@withContext iframeSrc

            // Ищем прямые ссылки на видео
            val videoSources = doc.select("source[src*=.mp4], source[src*=.m3u8], video[src]")
            if (videoSources.isNotEmpty()) {
                return@withContext videoSources.attr("src")
            }

            // Ищем в JavaScript (для kodik и подобных плееров)
            val scripts = doc.select("script")
            for (script in scripts) {
                val data = script.data()
                val videoMatch = Regex("""["'](https?://[^"']*\.(?:mp4|m3u8)[^"']*)["']""").find(data)
                if (videoMatch != null) {
                    return@withContext videoMatch.groupValues[1]
                }
            }

            null
        } catch (e: Exception) {
            null
        }
    }

    // Вспомогательные функции парсинга

    private fun extractSlug(url: String): String {
        return url.substringAfterLast("/")
            .substringBefore(".html")
            .substringBefore("?")
    }

    private fun extractRating(text: String): Double {
        val match = Regex("""(\d+[\.,]\d+)""").find(text)
        return match?.groupValues?.get(1)?.replace(",", ".")?.toDoubleOrNull() ?: 0.0
    }

    private fun extractYear(text: String): Int {
        val match = Regex("""(20\d{2})""").find(text)
        return match?.groupValues?.get(1)?.toIntOrNull() ?: 2024
    }

    private fun extractAge(text: String): String {
        val match = Regex("""(\d+)\+""").find(text)
        return if (match != null) "${match.groupValues[1]}+" else "16+"
    }

    private fun extractDuration(text: String): String {
        val match = Regex("""(\d+)\s*мин""").find(text)
        return if (match != null) "${match.groupValues[1]} мин" else "20 мин"
    }

    private fun extractGenres(text: String): List<String> {
        val knownGenres = listOf(
            "экшен", "приключения", "фэнтези", "исторический",
            "боевые искусства", "фантастика", "культивация", "комедия",
            "романтика", "драма", "триллер"
        )
        return knownGenres.filter { text.contains(it, ignoreCase = true) }
    }
}
