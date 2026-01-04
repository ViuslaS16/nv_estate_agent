import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavourites } from '../../context/FavouritesContext';
import { formatPrice } from '../../utils/searchHelpers';
import './Favourites.css';

function Favourites() {
    const {
        favourites,
        removeFromFavourites,
        clearAllFavourites,
        favouriteCount
    } = useFavourites();

    const [showConfirmClear, setShowConfirmClear] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);

    const handleClearAll = () => {
        if (showConfirmClear) {
            clearAllFavourites(true);
            setShowConfirmClear(false);
        } else {
            setShowConfirmClear(true);
        }
    };

    const handleCancelClear = () => {
        setShowConfirmClear(false);
    };

    return (
        <aside className={`favouritesPanel ${isExpanded ? 'expanded' : 'collapsed'}`}>

            <div className="favouritesHeader">
                <button
                    className="favouritesToggle"
                    onClick={() => setIsExpanded(!isExpanded)}
                    aria-expanded={isExpanded}
                    aria-controls="favourites-content"
                >
                    <img src="/icons/heart.svg" alt="" className="favouritesHeartIcon" aria-hidden="true" />
                    <span className="favouritesTitle">Favourites</span>
                    {favouriteCount > 0 && (
                        <span className="favouritesCount">{favouriteCount}</span>
                    )}
                    <img
                        src="/icons/chevron-down.svg"
                        alt=""
                        className={`toggleIcon ${isExpanded ? 'expanded' : ''}`}
                        aria-hidden="true"
                    />
                </button>
            </div>

            <div
                id="favourites-content"
                className={`favouritesContent ${isExpanded ? 'visible' : 'hidden'}`}
            >
                {favourites.length === 0 ? (
                    <div className="favouritesEmpty">
                        <p>No favourites yet</p>
                        <p className="favouritesEmptyHint">
                            Click the heart icon on properties to save them
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="favouritesList">
                            {favourites.map((property) => (
                                <div key={property.id} className="favouriteItem">
                                    <Link
                                        to={`/property/${property.id}`}
                                        className="favouriteItemLink"
                                    >
                                        <img
                                            src={property.thumbnail}
                                            alt={property.description}
                                            className="favouriteItemImage"
                                        />
                                        <div className="favouriteItemInfo">
                                            <span className="favouriteItemPrice">
                                                {formatPrice(property.price)}
                                            </span>
                                            <span className="favouriteItemLocation">
                                                {property.postcode} • {property.bedrooms} bed
                                            </span>
                                        </div>
                                    </Link>
                                    <button
                                        className="favouriteItemRemove"
                                        onClick={() => removeFromFavourites(property.id)}
                                        aria-label={`Remove ${property.description} from favourites`}
                                        title="Remove from favourites">
                                        <img src="/icons/close.svg" alt="" aria-hidden="true" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="favouritesActions">
                            {showConfirmClear ? (
                                <div className="confirmClear">
                                    <p>Remove all favourites?</p>
                                    <div className="confirmButtons">
                                        <button
                                            className="btn btnSecondary btnSm"
                                            onClick={handleCancelClear}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="btn btnDanger btnSm"
                                            onClick={handleClearAll}
                                        >
                                            Confirm
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    className="btn btnSecondary clearAllBtn"
                                    onClick={handleClearAll}
                                >
                                    <img src="/icons/trash.svg" alt="" className="trashIcon" aria-hidden="true" />
                                    Clear All
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </aside>
    );
}

export default Favourites;
