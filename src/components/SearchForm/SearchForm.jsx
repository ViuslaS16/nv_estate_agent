import { useState, useCallback } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { validateSearchCriteria } from '../../utils/searchHelpers';
import 'react-datepicker/dist/react-datepicker.css';
import './SearchForm.css';

/**
 * Property type for dropdown.
 */
const propertyTypeOptions = [
    { value: 'any', label: 'Any Type' },
    { value: 'house', label: 'House' },
    { value: 'flat', label: 'Flat' },
    { value: 'bungalow', label: 'Bungalow' }
];

/**
 * Bedroom option for dropdown.
 */
const bedroomOptions = [
    { value: '', label: 'No min' },
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' },
    { value: '5', label: '5+' }
];

const maxBedroomOptions = [
    { value: '', label: 'No max' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' }
];

/**
 * SearchForm Component search form for filtering properties.
 * @param {Function} onSearch
 */
function SearchForm({ onSearch }) {
    const [propertyType, setPropertyType] = useState(propertyTypeOptions[0]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [minBedrooms, setMinBedrooms] = useState(bedroomOptions[0]);
    const [maxBedrooms, setMaxBedrooms] = useState(maxBedroomOptions[0]);
    const [dateMode, setDateMode] = useState('after'); // 'after' or 'between'
    const [dateAfter, setDateAfter] = useState(null);
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    const [postcode, setPostcode] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        const criteria = {
            type: propertyType.value,
            minPrice: minPrice || undefined,
            maxPrice: maxPrice || undefined,
            minBedrooms: minBedrooms.value || undefined,
            maxBedrooms: maxBedrooms.value || undefined,
            postcode: postcode || undefined
        };

        if (dateMode === 'after' && dateAfter) {
            criteria.dateAfter = dateAfter.toISOString().split('T')[0];
        } else if (dateMode === 'between') {
            if (dateFrom) {
                criteria.dateFrom = dateFrom.toISOString().split('T')[0];
            }
            if (dateTo) {
                criteria.dateTo = dateTo.toISOString().split('T')[0];
            }
        }

        const validation = validateSearchCriteria(criteria);
        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        setErrors([]);
        onSearch(criteria);
    }, [propertyType, minPrice, maxPrice, minBedrooms, maxBedrooms, dateMode, dateAfter, dateFrom, dateTo, postcode, onSearch]);

    const handleReset = useCallback(() => {
        setPropertyType(propertyTypeOptions[0]);
        setMinPrice('');
        setMaxPrice('');
        setMinBedrooms(bedroomOptions[0]);
        setMaxBedrooms(maxBedroomOptions[0]);
        setDateMode('after');
        setDateAfter(null);
        setDateFrom(null);
        setDateTo(null);
        setPostcode('');
        setErrors([]);
        onSearch({});
    }, [onSearch]);

    return (
        <form className="searchForm" onSubmit={handleSubmit}>
            <h2 className="searchFormTitle">Find Your Perfect Property</h2>

            {errors.length > 0 && (
                <div className="searchFormErrors" role="alert">
                    {errors.map((error, index) => (
                        <p key={index} className="searchFormError">{error}</p>
                    ))}
                </div>
            )}

            <div className="searchFormGrid">
                <div className="formGroup">
                    <label htmlFor="propertyType" className="formLabel">
                        Property Type
                    </label>
                    <Select
                        id="propertyType"
                        inputId="propertyType"
                        options={propertyTypeOptions}
                        value={propertyType}
                        onChange={setPropertyType}
                        styles={selectStyles}
                        isSearchable={false}
                        aria-label="Select property type"
                    />
                </div>

                <div className="formGroup formGroupPrice">
                    <label className="formLabel">Price Range</label>
                    <div className="priceInputs">
                        <div className="priceInputWrapper">
                            <span className="pricePrefix">Rs.</span>
                            <input
                                type="number"
                                className="formInput priceInput"
                                placeholder="Min"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                min="0"
                                aria-label="Minimum price"
                            />
                        </div>
                        <span className="priceSeparator">to</span>
                        <div className="priceInputWrapper">
                            <span className="pricePrefix">Rs.</span>
                            <input
                                type="number"
                                className="formInput priceInput"
                                placeholder="Max"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                min="0"
                                aria-label="Maximum price"
                            />
                        </div>
                    </div>
                </div>

                <div className="formGroup formGroupBedrooms">
                    <label className="formLabel">Bedrooms</label>
                    <div className="bedroomSelects">
                        <Select
                            options={bedroomOptions}
                            value={minBedrooms}
                            onChange={setMinBedrooms}
                            styles={selectStyles}
                            isSearchable={false}
                            placeholder="Min"
                            aria-label="Minimum bedrooms"
                        />
                        <span className="bedroomSeparator">to</span>
                        <Select
                            options={maxBedroomOptions}
                            value={maxBedrooms}
                            onChange={setMaxBedrooms}
                            styles={selectStyles}
                            isSearchable={false}
                            placeholder="Max"
                            aria-label="Maximum bedrooms"
                        />
                    </div>
                </div>

                <div className="formGroup formGroupDate">
                    <label className="formLabel">Date Added</label>
                    <div className="dateModeToggle">
                        <button
                            type="button"
                            className={`dateModeBtn ${dateMode === 'after' ? 'active' : ''}`}
                            onClick={() => setDateMode('after')}
                        >
                            After
                        </button>
                        <button
                            type="button"
                            className={`dateModeBtn ${dateMode === 'between' ? 'active' : ''}`}
                            onClick={() => setDateMode('between')}
                        >
                            Between
                        </button>
                    </div>
                    <div className="dateInputs">
                        {dateMode === 'after' ? (
                            <DatePicker
                                selected={dateAfter}
                                onChange={setDateAfter}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Select date"
                                className="formInput"
                                isClearable
                                aria-label="Properties added after this date"
                            />
                        ) : (
                            <>
                                <DatePicker
                                    selected={dateFrom}
                                    onChange={setDateFrom}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="From"
                                    className="form-input"
                                    selectsStart
                                    startDate={dateFrom}
                                    endDate={dateTo}
                                    isClearable
                                    aria-label="Start date"
                                />
                                <span className="dateSeparator">to</span>
                                <DatePicker
                                    selected={dateTo}
                                    onChange={setDateTo}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="To"
                                    className="form-input"
                                    selectsEnd
                                    startDate={dateFrom}
                                    endDate={dateTo}
                                    minDate={dateFrom}
                                    isClearable
                                    aria-label="End date"
                                />
                            </>
                        )}
                    </div>
                </div>

                <div className="formGroup">
                    <label htmlFor="postcode" className="formLabel">
                        City/Area
                    </label>
                    <input
                        type="text"
                        id="postcode"
                        className="formInput"
                        placeholder="e.g. Colombo, Kandy, Galle"
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                        maxLength="10"
                        aria-label="City or area"
                    />
                    <span className="formHint">Enter city or area name</span>
                </div>
            </div>

            <div className="searchFormActions">
                <button type="submit" className="btn btnPrimary searchBtn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="searchIcon" aria-hidden="true">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                    </svg>
                    Search Properties
                </button>
                <button type="button" className="btn btnSecondary" onClick={handleReset}>
                    Clear Filters
                </button>
            </div>
        </form>
    );
}

export default SearchForm;


