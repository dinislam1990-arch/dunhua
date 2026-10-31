package ru.dunhuatv.app.presentation.home

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import ru.dunhuatv.app.data.repository.DunhuaRepository
import ru.dunhuatv.app.domain.model.DataResult
import ru.dunhuatv.app.domain.model.Series
import javax.inject.Inject

/**
 * ViewModel для главного экрана.
 */
@HiltViewModel
class HomeViewModel @Inject constructor(
    private val repository: DunhuaRepository
) : ViewModel() {

    private val _uiState = MutableStateFlow(HomeUiState())
    val uiState: StateFlow<HomeUiState> = _uiState.asStateFlow()

    init {
        loadData()
    }

    private fun loadData() {
        viewModelScope.launch {
            repository.getFeaturedSeries().collect { result ->
                when (result) {
                    is DataResult.Success -> _uiState.value = _uiState.value.copy(
                        featured = result.data,
                        isLoading = false
                    )
                    is DataResult.Error -> _uiState.value = _uiState.value.copy(
                        error = result.message,
                        isLoading = false
                    )
                    is DataResult.Loading -> _uiState.value = _uiState.value.copy(isLoading = true)
                }
            }
        }

        viewModelScope.launch {
            repository.getTopRated().collect { result ->
                if (result is DataResult.Success) {
                    _uiState.value = _uiState.value.copy(topRated = result.data)
                }
            }
        }

        viewModelScope.launch {
            repository.getNewReleases().collect { result ->
                if (result is DataResult.Success) {
                    _uiState.value = _uiState.value.copy(newReleases = result.data)
                }
            }
        }
    }
}

/**
 * UI State для главного экрана.
 */
data class HomeUiState(
    val featured: List<Series> = emptyList(),
    val topRated: List<Series> = emptyList(),
    val newReleases: List<Series> = emptyList(),
    val isLoading: Boolean = true,
    val error: String? = null
)
