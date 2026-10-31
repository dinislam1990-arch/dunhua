package ru.dunhuatv.app.domain.model

/**
 * Модель данных для мультсериала (дунхуа).
 */
data class Series(
    val id: Int,
    val title: String,
    val slug: String,
    val posterUrl: String,
    val rating: Double,
    val ageRating: String,
    val duration: String,
    val year: Int,
    val genres: List<String>,
    val description: String,
    val status: SeriesStatus,
    val totalEpisodes: Int?,
    val episodes: List<Episode> = emptyList()
)

enum class SeriesStatus {
    ONGOING, COMPLETED
}

/**
 * Модель данных для серии (эпизода).
 */
data class Episode(
    val id: Int,
    val number: Int,
    val title: String,
    val videoUrl: String,
    val thumbnailUrl: String? = null,
    val date: String? = null
)

/**
 * Модель данных для новостной записи.
 */
data class NewsItem(
    val id: Int,
    val title: String,
    val date: String,
    val content: String,
    val imageUrl: String? = null
)

/**
 * Настройки приложения.
 */
data class AppSettings(
    val autoplay: Boolean = true,
    val quality: VideoQuality = VideoQuality.HD_720,
    val playbackSpeed: Float = 1.0f,
    val subtitlesEnabled: Boolean = false,
    val subtitleSize: SubtitleSize = SubtitleSize.MEDIUM,
    val volume: Int = 80
)

enum class VideoQuality(val label: String) {
    SD_480("480p"),
    HD_720("720p"),
    FULL_HD_1080("1080p"),
    AUTO("Авто")
}

enum class SubtitleSize {
    SMALL, MEDIUM, LARGE
}

/**
 * Результат операции с данными.
 */
sealed class DataResult<out T> {
    data class Success<T>(val data: T) : DataResult<T>()
    data class Error(val message: String, val throwable: Throwable? = null) : DataResult<Nothing>()
    data object Loading : DataResult<Nothing>()
}
