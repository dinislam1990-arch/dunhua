package ru.dunhuatv.app.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.runtime.Composable
import androidx.tv.material3.MaterialTheme
import androidx.tv.material3.darkColorScheme

/**
 * Тема приложения для Android TV.
 * Тёмная тема по умолчанию, оптимизирована для 10-foot UI.
 */
private val TvDarkColorScheme = darkColorScheme(
    primary = TvAccent,
    onPrimary = TvTextPrimary,
    secondary = TvAccentLight,
    background = TvBackground,
    surface = TvSurface,
    onSurface = TvTextPrimary,
    onBackground = TvTextPrimary
)

@Composable
fun DunhuaTVTheme(
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = TvDarkColorScheme,
        content = content
    )
}
