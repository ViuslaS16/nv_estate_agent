import { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Create the FavouritesContext for global state management.
const FavouritesContext = createContext();

/**
 * Custom hook to access favourites context.
 * @returns {Object}
 * @throws
 */
export function useFavourites() {
    const context = useContext(FavouritesContext);
    if (!context) {
        throw new Error('useFavourites must be used within a FavouritesProvider');
    }
    return context;
}

export function FavouritesProvider({ children }) {
    const [favourites, setFavourites] = useState([]);
    const [notification , setNotification] = useState(null);
    
    /**
     * Shows a message notification.
     * @param {string} message 
     * @param {string} type 
     */
    const showNotification = useCallback((message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    }, []);

    /**
     * Adds a property to favourites.
     * @param {Object} property 
     * @returns {boolean}
     */
    const addToFavourites = useCallback((property) => {
        // Check for duplicates using property ID
        const isDuplicate = favourites.some(fav => fav.id === property.id);

        if (isDuplicate) {
            showNotification('This property is already in your favourites', 'warning');
            return false;
        }

        setFavourites(prev => [...prev, property]);
        showNotification('Added to favourites!', 'success');
        return true;
    }, [favourites, showNotification]);

    /**
     * Removes a property from favourites.
     * @param {string|number} propertyId
     */
    const removeFromFavourites = useCallback((propertyId) => {
        setFavourites(prev => prev.filter(fav => fav.id !== propertyId));
        showNotification('Removed from favourites', 'success');
    }, [showNotification]);

    /**
     * Clears all favourites
     * @param {boolean} confirmed
     */
    const clearAllFavourites = useCallback((confirmed = false) => {
        if (confirmed) {
            setFavourites([]);
            showNotification('All favourites cleared', 'success');
        }
    }, [showNotification]);

    /**
     * Checks if a property is in favourites.
     * @param {string|number} propertyId
     * @returns {boolean}
     */
    const isFavourite = useCallback((propertyId) => {
        return favourites.some(fav => fav.id === propertyId);
    }, [favourites]);

    /**
     * Toggles a property favourites.
     * @param {Object} property - Property object to toggle
     */
    const toggleFavourite = useCallback((property) => {
        const isInFavourites = favourites.some(fav => fav.id === property.id);

        if (isInFavourites) {
            removeFromFavourites(property.id);
        } else {
            setFavourites(prev => [...prev, property]);
            showNotification('Added to favourites!', 'success');
        }
    }, [favourites, removeFromFavourites, showNotification]);

    const value = {
        favourites,
        notification,
        addToFavourites,
        removeFromFavourites,
        clearAllFavourites,
        isFavourite,
        toggleFavourite,
        favouriteCount: favourites.length
    };

    return (
        <FavouritesContext.Provider value={value}>
            {children}
        </FavouritesContext.Provider>
    );
}