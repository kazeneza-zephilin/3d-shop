import { useState, useCallback } from 'react';

export const useErrorHandler = () => {
    const [error, setError] = useState(null);

    const showError = useCallback((message, type = 'general') => {
        setError({
            message,
            type,
            timestamp: Date.now()
        });
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        error,
        showError,
        clearError
    };
};
