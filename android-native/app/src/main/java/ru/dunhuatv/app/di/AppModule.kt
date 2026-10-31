package ru.dunhuatv.app.di

import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import ru.dunhuatv.app.data.repository.DunhuaRepository
import ru.dunhuatv.app.data.repository.MockDunhuaRepository
import javax.inject.Singleton

/**
 * Dagger Hilt модуль для внедрения зависимостей.
 * 
 * ВАЖНО: Чтобы переключиться с моков на реальный парсинг/API:
 * 1. Создайте RealDunhuaRepository с Jsoup-парсингом
 * 2. Замените MockDunhuaRepository() на RealDunhuaRepository() ниже
 */
@Module
@InstallIn(SingletonComponent::class)
object AppModule {

    @Provides
    @Singleton
    fun provideDunhuaRepository(): DunhuaRepository {
        // Замените на RealDunhuaRepository() когда будет готов парсинг
        return MockDunhuaRepository()
    }
}
