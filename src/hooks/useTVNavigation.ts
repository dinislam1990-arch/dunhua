import { useEffect, useRef, useCallback } from 'react';

/**
 * Hook for TV remote / D-pad navigation
 * Handles arrow keys, Enter, Back, and media keys
 */
export function useTVNavigation() {
  const focusableElements = useRef<HTMLElement[]>([]);
  const currentIndex = useRef(0);

  const updateFocusableElements = useCallback(() => {
    focusableElements.current = Array.from(
      document.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [tabindex="0"], a[href], input:not([disabled]), select:not([disabled])'
      )
    ).filter(el => {
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    });
  }, []);

  const focusElement = useCallback((index: number) => {
    const elements = focusableElements.current;
    if (elements.length === 0) return;
    
    const validIndex = ((index % elements.length) + elements.length) % elements.length;
    currentIndex.current = validIndex;
    elements[validIndex]?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      updateFocusableElements();
      const elements = focusableElements.current;
      if (elements.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight': {
          e.preventDefault();
          focusElement(currentIndex.current + 1);
          break;
        }
        case 'ArrowUp':
        case 'ArrowLeft': {
          e.preventDefault();
          focusElement(currentIndex.current - 1);
          break;
        }
        case 'Enter':
        case ' ': {
          // Let default behavior handle it for focused elements
          break;
        }
        case 'Backspace':
        case 'BrowserBack': {
          e.preventDefault();
          window.history.back();
          break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [updateFocusableElements, focusElement]);

  return { focusElement };
}

/**
 * Hook for auto-refreshing data at intervals
 */
export function useAutoRefresh(callback: () => void, intervalMs: number = 300000) {
  useEffect(() => {
    const interval = setInterval(callback, intervalMs);
    return () => clearInterval(interval);
  }, [callback, intervalMs]);
}
