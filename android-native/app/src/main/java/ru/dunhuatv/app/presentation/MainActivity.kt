package ru.dunhuatv.app.presentation

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import dagger.hilt.android.AndroidEntryPoint
import ru.dunhuatv.app.presentation.home.HomeScreen
import ru.dunhuatv.app.presentation.details.DetailsScreen
import ru.dunhuatv.app.presentation.player.PlayerScreen
import ru.dunhuatv.app.presentation.catalog.CatalogScreen
import ru.dunhuatv.app.presentation.settings.SettingsScreen
import ru.dunhuatv.app.ui.theme.DunhuaTVTheme
import ru.dunhuatv.app.ui.theme.TvBackground

/**
 * Главная Activity приложения.
 * Точка входа для Android TV.
 */
@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            DunhuaTVTheme {
                DunhuaTVApp()
            }
        }
    }
}

/**
 * Корневой Composable с навигацией.
 * Использует Navigation Compose для маршрутизации между экранами.
 */
@Composable
fun DunhuaTVApp() {
    val navController = rememberNavController()

    NavHost(
        navController = navController,
        startDestination = Screen.Home.route,
        modifier = Modifier
            .fillMaxSize()
            .background(TvBackground)
    ) {
        composable(Screen.Home.route) {
            HomeScreen(
                onSeriesClick = { slug ->
                    navController.navigate(Screen.Details.createRoute(slug))
                },
                onSettingsClick = {
                    navController.navigate(Screen.Settings.route)
                }
            )
        }

        composable(Screen.Catalog.route) {
            CatalogScreen(
                onSeriesClick = { slug ->
                    navController.navigate(Screen.Details.createRoute(slug))
                }
            )
        }

        composable(
            route = Screen.Details.route,
            arguments = Screen.Details.navArguments
        ) { backStackEntry ->
            val slug = backStackEntry.arguments?.getString("slug") ?: return@composable
            DetailsScreen(
                slug = slug,
                onBackClick = { navController.popBackStack() },
                onPlayClick = { episode ->
                    navController.navigate(Screen.Player.createRoute(slug, episode))
                }
            )
        }

        composable(
            route = Screen.Player.route,
            arguments = Screen.Player.navArguments
        ) { backStackEntry ->
            val slug = backStackEntry.arguments?.getString("slug") ?: return@composable
            val episode = backStackEntry.arguments?.getInt("episode") ?: 1
            PlayerScreen(
                slug = slug,
                startEpisode = episode,
                onBackClick = { navController.popBackStack() },
                onNextEpisode = { nextEp ->
                    navController.navigate(Screen.Player.createRoute(slug, nextEp)) {
                        popUpTo(Screen.Player.createRoute(slug, episode)) { inclusive = true }
                    }
                }
            )
        }

        composable(Screen.Settings.route) {
            SettingsScreen(
                onBackClick = { navController.popBackStack() }
            )
        }
    }
}

/**
 * Определение маршрутов навигации.
 */
sealed class Screen(val route: String) {
    data object Home : Screen("home")
    data object Catalog : Screen("catalog")
    data object Settings : Screen("settings")
    
    data object Details : Screen("details/{slug}") {
        fun createRoute(slug: String) = "details/$slug"
        val navArguments = listOf(
            androidx.navigation.NavArgument("slug") {
                type = androidx.navigation.NavType.StringType
            }
        )
    }
    
    data object Player : Screen("player/{slug}?episode={episode}") {
        fun createRoute(slug: String, episode: Int) = "player/$slug?episode=$episode"
        val navArguments = listOf(
            androidx.navigation.NavArgument("slug") {
                type = androidx.navigation.NavType.StringType
            },
            androidx.navigation.NavArgument("episode") {
                type = androidx.navigation.NavType.IntType
                defaultValue = 1
            }
        )
    }
}
