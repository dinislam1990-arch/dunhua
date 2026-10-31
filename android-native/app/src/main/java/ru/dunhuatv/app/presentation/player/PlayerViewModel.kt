package ru.dunhuatv.app.presentation.player

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

@HiltViewModel
class PlayerViewModel @Inject constructor(
    private val repository: DunhuaRepository
) : ViewModel() {

    private val _uiState = MutableStateFlow(PlayerUiState())
    val uiState: StateFlow<PlayerUiState> = _uiState.asStateFlow()

    fun loadSeries(slug: String) {
        viewModelScope.launch {
            repository.getSeriesBySlug(slug).collect { result ->
                when (result) {
                    is DataResult.Success -> _uiState.value = _uiState.value.copy(
                        series = result.data,
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
    }
}

data class PlayerUiState(
    val series: Series? = null,
    val isLoading: Boolean = true,
    val error: String? = null
)
