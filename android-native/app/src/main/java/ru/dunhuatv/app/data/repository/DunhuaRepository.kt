package ru.dunhuatv.app.data.repository

import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import ru.dunhuatv.app.domain.model.*

/**
 * Интерфейс репозитория для получения данных.
 * Позволяет легко переключаться между моками и реальным API/парсингом.
 */
interface DunhuaRepository {
    fun getFeaturedSeries(): Flow<DataResult<List<Series>>>
    fun getTopRated(): Flow<DataResult<List<Series>>>
    fun getNewReleases(): Flow<DataResult<List<Series>>>
    fun getSeriesBySlug(slug: String): Flow<DataResult<Series>>
    fun getNews(): Flow<DataResult<List<NewsItem>>>
    fun searchSeries(query: String): Flow<DataResult<List<Series>>>
    fun getSeriesByGenre(genre: String): Flow<DataResult<List<Series>>>
}

/**
 * Mock-репозиторий с тестовыми данными для немедленной отрисовки UI.
 * Замените на RealDunhuaRepository когда будет готов парсинг/API.
 */
class MockDunhuaRepository : DunhuaRepository {

    private val mockSeries = listOf(
        Series(
            id = 1,
            title = "Сказание о пастухе богов",
            slug = "skazanie-o-pastuhe-bogov",
            posterUrl = "https://dunhuatv.ru/uploads/posts/2025-08/skazanie-o-pastuhe-bogov1.webp",
            rating = 9.4,
            ageRating = "16+",
            duration = "20 мин",
            year = 2024,
            genres = listOf("экшен", "приключения", "фэнтези", "исторический"),
            description = "В мире, где некогда царили древние боги, эпоха их власти подошла к концу, оставив после себя лишь осколки мифов и магию.",
            status = SeriesStatus.ONGOING,
            totalEpisodes = 40,
            episodes = (1..40).map { Episode(it, it, "Серия $it", "https://dunhuatv.ru/15-skazanie-o-pastuhe-bogov-smotret-onlajn.html") }
        ),
        Series(
            id = 2,
            title = "Окутывая небеса",
            slug = "okutyvaja-nebesa",
            posterUrl = "https://dunhuatv.ru/uploads/posts/2025-08/okutyvaja-nebesa1.webp",
            rating = 9.7,
            ageRating = "16+",
            duration = "18 мин",
            year = 2023,
            genres = listOf("экшен", "приключения", "фантастика"),
            description = "В отдаленном уголке Вселенной, где научные открытия и мистические явления смешиваются в единое целое.",
            status = SeriesStatus.ONGOING,
            totalEpisodes = 52,
            episodes = (1..52).map { Episode(it, it, "Серия $it", "https://dunhuatv.ru/7-okutyvaja-nebesa-smotret-onlajn.html") }
        ),
        Series(
            id = 3,
            title = "За гранью времени",
            slug = "za-granju-vremeni",
            posterUrl = "https://dunhuatv.ru/uploads/posts/2025-08/za-granju-vremeni1.webp",
            rating = 9.6,
            ageRating = "16+",
            duration = "20 мин",
            year = 2025,
            genres = listOf("экшен", "приключения", "фэнтези", "боевые искусства"),
            description = "В один роковой день привычный мир рухнул. Ещё вчера здесь царило благоденствие.",
            status = SeriesStatus.ONGOING,
            totalEpisodes = 20,
            episodes = (1..20).map { Episode(it, it, "Серия $it", "https://dunhuatv.ru/684-za-granju-vremeni.html") }
        ),
        Series(
            id = 4,
            title = "Противостояние святого",
            slug = "protivostojanie-svjatogo",
            posterUrl = "https://dunhuatv.ru/uploads/posts/2026-10/protivostojanie-svjatogo26.webp",
            rating = 6.7,
            ageRating = "16+",
            duration = "25 мин",
            year = 2023,
            genres = listOf("экшен", "приключения", "фэнтези"),
            description = "Главный герой, Ван Лин, — обычный юноша из небогатой семьи.",
            status = SeriesStatus.ONGOING,
            totalEpisodes = 60,
            episodes = (1..60).map { Episode(it, it, "Серия $it", "https://dunhuatv.ru/8-protivostojanie-svjatogo-smotret-onlajn.html") }
        ),
        Series(
            id = 5,
            title = "Расколотая битвой синева небес 5",
            slug = "raskolotaja-bitvoj-sineva-nebes-5",
            posterUrl = "https://dunhuatv.ru/uploads/posts/2025-07/raskolotaja-bitvoj-sineva-nebes-51.webp",
            rating = 9.4,
            ageRating = "16+",
            duration = "24 мин",
            year = 2022,
            genres = listOf("экшен", "приключения", "фэнтези", "боевые искусства"),
            description = "В мире, где магия и боевые искусства определяют судьбу каждого.",
            status = SeriesStatus.ONGOING,
            totalEpisodes = 52,
            episodes = (1..52).map { Episode(it, it, "Серия $it", "https://dunhuatv.ru/24-raskolotaja-bitvoj-sineva-nebes-5-smotret-onlajn.html") }
        )
    )

    override fun getFeaturedSeries(): Flow<DataResult<List<Series>>> = flow {
        emit(DataResult.Loading)
        kotlinx.coroutines.delay(500) // Имитация загрузки
        emit(DataResult.Success(mockSeries.take(4)))
    }

    override fun getTopRated(): Flow<DataResult<List<Series>>> = flow {
        emit(DataResult.Loading)
        kotlinx.coroutines.delay(300)
        emit(DataResult.Success(mockSeries.sortedByDescending { it.rating }))
    }

    override fun getNewReleases(): Flow<DataResult<List<Series>>> = flow {
        emit(DataResult.Loading)
        kotlinx.coroutines.delay(300)
        emit(DataResult.Success(mockSeries.filter { it.year >= 2024 }))
    }

    override fun getSeriesBySlug(slug: String): Flow<DataResult<Series>> = flow {
        emit(DataResult.Loading)
        kotlinx.coroutines.delay(200)
        val series = mockSeries.find { it.slug == slug }
        if (series != null) {
            emit(DataResult.Success(series))
        } else {
            emit(DataResult.Error("Серия не найдена"))
        }
    }

    override fun getNews(): Flow<DataResult<List<NewsItem>>> = flow {
        emit(DataResult.Loading)
        kotlinx.coroutines.delay(300)
        emit(DataResult.Success(listOf(
            NewsItem(1, "Новые серии «Несравненный боевой дух 2»", "2026-01-15", "Вышли новые серии."),
            NewsItem(2, "Премьера «За гранью времени 2»", "2026-01-10", "Начался показ второго сезона."),
            NewsItem(3, "Обновление «Путешествие к бессмертию 5»", "2026-01-08", "Пятый сезон продолжает радовать.")
        )))
    }

    override fun searchSeries(query: String): Flow<DataResult<List<Series>>> = flow {
        emit(DataResult.Loading)
        kotlinx.coroutines.delay(200)
        val results = mockSeries.filter { 
            it.title.contains(query, ignoreCase = true) ||
            it.genres.any { g -> g.contains(query, ignoreCase = true) }
        }
        emit(DataResult.Success(results))
    }

    override fun getSeriesByGenre(genre: String): Flow<DataResult<List<Series>>> = flow {
        emit(DataResult.Loading)
        kotlinx.coroutines.delay(200)
        val results = mockSeries.filter { it.genres.contains(genre) }
        emit(DataResult.Success(results))
    }
}
