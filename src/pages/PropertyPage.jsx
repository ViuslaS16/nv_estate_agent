import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import PropertyTabs from '../components/PropertyTabs/PropertyTabs';
import { useFavourites } from '../context/FavouritesContext';
import { formatPrice, formatDate } from '../utils/searchHelpers';
import Notification from '../components/Notification/Notification';
import propertiesData from '../data/properties.json';
import './PropertyPage.css';

function PropertyPage() {
    const { id } = useParams();
    const { toggleFavourite, isFavourite, notification } = useFavourites();
    const [property, setProperty] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const foundProperty = propertiesData.find(p => p.id === id);
        setProperty(foundProperty);
        setIsLoading(false);
        window.scrollTo(0, 0);
    }, [id]);

    if (isLoading) {
        return (
            <div className="propertyPageLoading">
                <div className="loadingSpinner"></div>
                <p>Loading property...</p>
            </div>
        );
    }

    if (!property) {
        return (
            <div className="propertyPageError">
                <div className="container">
                    <h1>Property Not Found</h1>
                    <p>Sorry, we couldn't find the property you're looking for.</p>
                    <Link to="/" className="btn btnPrimary">
                        Back to Search
                    </Link>
                </div>
            </div>
        );
    }

    const isPropertyFavourite = isFavourite(property.id);

    return (
        <div className="propertyPage">
            <div className="container">
                {/* Breadcrumb Navigation */}
                <nav className="propertyBreadcrumb" aria-label="Breadcrumb">
                    <Link to="/">Search</Link>
                    <span className="breadcrumbSeparator" aria-hidden="true">/</span>
                    <span className="breadcrumbCurrent">{property.postcode}</span>
                </nav>

                {/* Property Header */}
                <header className="propertyHeader">
                    <div className="propertyHeaderInfo">
                        <span className="propertyTypeBadge">{property.type}</span>
                        <h1 className="propertyTitle">{property.description}</h1>
                        <p className="propertyLocation">
                            <img src="/icons/location.svg" alt="" className="locationIcon" aria-hidden="true" />
                            {property.location}
                        </p>
                    </div>

                    <div className="propertyHeaderActions">
                        <p className="propertyPriceLarge">{formatPrice(property.price)}</p>
                        <button
                            className={`btn ${isPropertyFavourite ? 'btnFavouriteActive' : 'btnFavourite'}`}
                            onClick={() => toggleFavourite(property)}
                        >
                            <img src="/icons/heart.svg" alt="" className="heartIcon" aria-hidden="true" />
                            {isPropertyFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
                        </button>
                    </div>
                </header>

                {/* Property Meta Info */}
                <div className="propertyMeta">
                    <div className="propertyMetaItem">
                        <img src="/icons/bed.svg" alt="" aria-hidden="true" />
                        <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</span>
                    </div>
                    <div className="propertyMetaItem">
                        <img src="/icons/chart.svg" alt="" aria-hidden="true" />
                        <span>{property.type}</span>
                    </div>
                    <div className="propertyMetaItem">
                        <img src="/icons/calendar.svg" alt="" aria-hidden="true" />
                        <span>Added {formatDate(property.dateAdded)}</span>
                    </div>
                    <div className="propertyMetaItem">
                        <img src="/icons/location.svg" alt="" aria-hidden="true" />
                        <span>{property.postcode}</span>
                    </div>
                </div>

                <ImageGallery images={property.images} title={property.description} />

                <PropertyTabs property={property} />

                <div className="propertyBackLink">
                    <Link to="/" className="btn btnOutline">
                        ← Back to Search Results
                    </Link>
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

export default PropertyPage;
