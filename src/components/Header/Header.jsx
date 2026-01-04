import { Link } from "react-router-dom";
import { useFavourites } from "../../context/FavouritesContext";
import './Header.css';

// Header commponent for navigation.
function Header() {
    const { favourites, favouriteCount } = useFavourites();

    return (
        <header className="header">
            <div className="container headerContainer">
                <Link to="/" className="headerLogo">
                    <img src="/images/nv_logo.png" alt="NV Estate Agents Logo" className="headerLogoIcon" />
                    <span className="headerLogoText">NV Estate Agents</span>
                </Link>

                <nav className="headerNav" aria-label="Main Navigation">
                    <Link to="/" className="headerNavLink">Search Properties</Link>
                    <Link to="/" className="headerNavLink headerFavourites">
                        <img src="/icons/heart_icon.svg" alt="Favourites icon" className="headerHeartIcon" aria-hidden="true" />
                        Favourites
                        {favouriteCount > 0 && (
                            <span className="headerFavouriteBadge" aria-label={`${favouriteCount} favourites`}>
                                {favouriteCount}
                            </span>
                        )}
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;
