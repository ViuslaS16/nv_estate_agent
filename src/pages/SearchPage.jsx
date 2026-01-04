import { useState, useMemo, useCallback } from 'react';
import SearchForm from '../components/SearchForm/SearchForm';
import PropertyGrid from '../components/PropertyGrid/PropertyGrid';
import Favourites from '../components/Favourites/Favourites';
import Notification from '../components/Notification/Notification';
import { useFavourites } from '../context/FavouritesContext';
import { filterProperties } from '../utils/searchHelpers';
import propertiesData from '../data/properties.json';
import './SearchPage.css';

/* Main landing page */
function SearchPage() {
    const [searchCriteria, setSearchCriteria] = useState({});
    const { notification } = useFavourites();
        const filteredProperties = useMemo(() => {
        return filterProperties(propertiesData, searchCriteria);
    }, [searchCriteria]);

    const handleSearch = useCallback((criteria) => {
        setSearchCriteria(criteria);
    }, []);

    return (
        <div className="searchPage">
            <div className="container">
                <header className="searchPageHeader">
                    <h1>Find Your Perfect Property</h1>
                    <p className="searchPageSubtitle">
                        Discover your dream home from our selection of properties across Sri Lanka
                    </p>
                </header>

                <SearchForm onSearch={handleSearch} />

                <h2 className="searchResultsTitle">
                    {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'} Found
                </h2>

                <div className="searchPageContent">
                    <PropertyGrid properties={filteredProperties} />
                    <Favourites />
                </div>
            </div>

            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                />
            )}
        </div>
    );
}

export default SearchPage;
