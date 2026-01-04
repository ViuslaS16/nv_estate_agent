import PropertyCard from '../PropertyCard/PropertyCard';
import './PropertyGrid.css';

function PropertyGrid({ properties }) {
    return (
        <div className="propertyGridSection">
            {properties.length === 0 ? (
                <div className="propertyGridEmpty">
                    <div className="emptyIcon">🏠</div>
                    <h3>No Properties Found</h3>
                    <p>
                        Try adjusting your search criteria or clearing filters to see more results.
                    </p>
                </div>
            ) : 
            (
                <div className="propertyGrid">
                    {properties.map((property) => (
                        <PropertyCard
                            key={property.id}
                            property={property}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default PropertyGrid;
