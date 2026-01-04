import { Link } from 'react-router-dom';
import { useFavourites } from '../../context/FavouritesContext';
import { formatPrice } from '../../utils/searchHelpers';
import './PropertyCard.css';

/**
 *  PropertyCard Component - Displays a single property in the search results grid
 * @param {Object} property
 */

function PropertyCard({ property }) {
    const { toggleFavourite, isFavourite } = useFavourites();
    const isPropertyFavourite = isFavourite(property.id);

    // Handle Favourite Button Click
    const handleFavouriteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavourite(property);
    };

    return (
        <article className="propertyCard">
            <Link to={`/property/${property.id}`} className="propertyCardLink">
    
                <div className="propertyCardImageWrapper">
                    <img
                        src={property.thumbnail}
                        alt={`${property.type} in ${property.postcode}`}
                        className="propertyCardImage"
                        loading="lazy"
                    />
              
                    <span className="propertyCardBadge">
                        {property.type}
                    </span>
               
                    {isPropertyFavourite && (
                        <span className="propertyCardFavouriteBadge" aria-label="In favourites">
                            ♥
                        </span>
                    )}
                </div>

                <div className="propertyCardContent">
                    <p className="propertyCardPrice">
                        {formatPrice(property.price)}
                    </p>
                    <h3 className="propertyCardTitle">{property.description}</h3>

                    <div className="propertyCardMeta">
                        <span className="propertyCardBedrooms">
                            <img src="/icons/bed.svg" alt="" className="metaIcon" aria-hidden="true" />
                            {property.bedrooms} {property.bedrooms === 1 ? 'bed' : 'beds'}
                        </span>
                        <span className="propertyCardPostcode">
                            <img src="/icons/location.svg" alt="" className="metaIcon" aria-hidden="true" />
                            {property.postcode}
                        </span>
                    </div>
                </div>
            </Link>
            
            <button
                className={`propertyCardFavBtn ${isPropertyFavourite ? 'active' : ''}`}
                onClick={handleFavouriteClick}
                aria-label={isPropertyFavourite ? 'Remove from favourites' : 'Add to favourites'}
                title={isPropertyFavourite ? 'Remove from favourites' : 'Add to favourites'}
            >
                <img src="/icons/heart.svg" alt="" className="heartIcon" aria-hidden="true" />
            </button>
        </article>
    );
}

export default PropertyCard;
