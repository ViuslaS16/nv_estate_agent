import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PropertyMap from '../PropertyMap/PropertyMap';
import 'react-tabs/style/react-tabs.css';
import './PropertyTabs.css';

function PropertyTabs({ property }) {
    return (
        <div className="propertyTabsContainer">
            <Tabs className="propertyTabs">
                <TabList className="tabsList">
                    <Tab className="tab" selectedClassName="tabSelected">
                        <img src="/icons/description.svg" alt="" className="tabIcon" aria-hidden="true" />
                        Description
                    </Tab>
                    <Tab className="tab" selectedClassName="tabSelected">
                        <img src="/icons/floorplan.svg" alt="" className="tabIcon" aria-hidden="true" />
                        Floor Plan
                    </Tab>
                    <Tab className="tab" selectedClassName="tabSelected">
                        <img src="/icons/location.svg" alt="" className="tabIcon" aria-hidden="true" />
                        Map
                    </Tab>
                </TabList>

                <TabPanel className="tabPanel" selectedClassName="tabPanelSelected">
                    <div className="tabContent descriptionContent">
                        <h3>Property Description</h3>
                        {property.longDescription.split('\n\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}

                        <div className="propertyFeatures">
                            <h4>Key Features</h4>
                            <ul>
                                <li>{property.bedrooms} {property.bedrooms === 1 ? 'bedroom' : 'bedrooms'}</li>
                                <li>{property.type.charAt(0).toUpperCase() + property.type.slice(1)} property</li>
                                <li>Located in {property.postcode}</li>
                                <li>Recently added</li>
                            </ul>
                        </div>
                    </div>
                </TabPanel>

                <TabPanel className="tabPanel" selectedClassName="tabPanelSelected">
                    <div className="tabContent floorplanContent">
                        <h3>Floor Plan</h3>
                        {property.floorPlan ? (
                            <div className="floorplanWrapper">
                                <img
                                    src={property.floorPlan}
                                    alt={`Floor plan for ${property.description}`}
                                    className="floorplanImage"
                                />
                            </div>
                        ) : (
                            <div className="floorplanUnavailable">
                                <img src="/icons/floorplan.svg" alt="" className="floorplanUnavailableIcon" aria-hidden="true" />
                                <p>Floor plan not available for this property</p>
                            </div>
                        )}
                    </div>
                </TabPanel>

                <TabPanel className="tabPanel" selectedClassName="tabPanelSelected">
                    <div className="tabContent mapContent">
                        <h3>Location</h3>
                        <p className="mapAddress">
                            <strong>{property.location}</strong>
                        </p>
                        <div className="mapWrapper">
                            <PropertyMap
                                lat={property.coordinates.lat}
                                lng={property.coordinates.lng}
                                address={property.location}
                            />
                        </div>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
}

export default PropertyTabs;
