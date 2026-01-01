/**
 * Filters properties based on multiple search criteria
 * 
 * @param {Array} properties 
 * @param {Object} criteria 
 * @param {string} criteria.type 
 * @param {number} criteria.minPrice 
 * @param {number} criteria.maxPrice 
 * @param {number} criteria.minBedrooms 
 * @param {number} criteria.maxBedrooms 
 * @param {string} criteria.dateAfter 
 * @param {string} criteria.dateFrom 
 * @param {string} criteria.dateTo 
 * @param {string} criteria.postcode 
 * @returns {Array} 
 */

export function filterProperties(properties, criteria) {
        if (!criteria || Object.keys(criteria).length === 0) {
        return properties;
    }
        return properties.filter(property => {

        // Type filter - check if type matches
        if (criteria.type && criteria.type.toLowerCase() !== 'any') {
            if (property.type.toLowerCase() !== criteria.type.toLowerCase()) {
                return false;
            }
        }
        // Minimum Price filter
        if (criteria.minPrice !== undefined && criteria.minPrice !== null && criteria.minPrice !== '') {
            const minPrice = Number(criteria.minPrice);
            if (!isNaN(minPrice) && property.price < minPrice) {
                return false;
            }
        }

        // Maximum price filter
        if (criteria.maxPrice !== undefined && criteria.maxPrice !== null && criteria.maxPrice !== '') {
            const maxPrice = Number(criteria.maxPrice);
            if (!isNaN(maxPrice) && property.price > maxPrice) {
                return false;
            }
        }

        // Minimum bedrooms filter
        if (criteria.minBedrooms !== undefined && criteria.minBedrooms !== null && criteria.minBedrooms !== '') {
            const minBeds = Number(criteria.minBedrooms);
            if (!isNaN(minBeds) && property.bedrooms < minBeds) {
                return false;
            }
        }

        // Maximum bedrooms filter
        if (criteria.maxBedrooms !== undefined && criteria.maxBedrooms !== null && criteria.maxBedrooms !== '') {
            const maxBeds = Number(criteria.maxBedrooms);
            if (!isNaN(maxBeds) && property.bedrooms > maxBeds) {
                return false;
            }
        }

        // Date filter - "added after" single date
        if (criteria.dateAfter) {
            const propertyDate = new Date(property.dateAdded);
            const afterDate = new Date(criteria.dateAfter);
            if (propertyDate < afterDate) {
                return false;
            }
        }

         // Date filter - "added between" date range
        if (criteria.dateFrom) {
            const propertyDate = new Date(property.dateAdded);
            const fromDate = new Date(criteria.dateFrom);
            if (propertyDate < fromDate) {
                return false;
            }
        }

        if (criteria.dateTo) {
            const propertyDate = new Date(property.dateAdded);
            const toDate = new Date(criteria.dateTo);
            if (propertyDate > toDate) {
                return false;
            }
        }

        // Postcode filter - case-insensitive prefix matching
        if (criteria.postcode && criteria.postcode.trim() !== '') {
            const searchPostcode = criteria.postcode.trim().toUpperCase();
            const propertyPostcode = property.postcode.toUpperCase();
            if (!propertyPostcode.startsWith(searchPostcode)) {
                return false;
            }
        }
        return true;
    });
}

/**
 * Validates search criteria for logical consistency
 * 
 * @param {Object} criteria 
 * @returns {Object} 
 */
export function validateSearchCriteria(criteria) {
    const errors = [];

    // Validate min/max price
    if (criteria.minPrice && criteria.maxPrice) {
        const min = Number(criteria.minPrice);
        const max = Number(criteria.maxPrice);
        if (!isNaN(min) && !isNaN(max) && min > max) {
            errors.push('Minimum price cannot be greater than maximum price');
        }
    }

    // Validate min/max bedrooms
    if (criteria.minBedrooms && criteria.maxBedrooms) {
        const min = Number(criteria.minBedrooms);
        const max = Number(criteria.maxBedrooms);
        if (!isNaN(min) && !isNaN(max) && min > max) {
            errors.push('Minimum bedrooms cannot be greater than maximum bedrooms');
        }
    }

    // Validate date range
    if (criteria.dateFrom && criteria.dateTo) {
        const from = new Date(criteria.dateFrom);
        const to = new Date(criteria.dateTo);
        if (from > to) {
            errors.push('Start date cannot be after end date');
        }
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

/**
 * Formats a price in LKR currency format
 
 * @param {number} price 
 * @returns {string} ]
 */
export function formatPrice(price) {
    return new Intl.NumberFormat('en-LK', {
        style: 'currency',
        currency: 'LKR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}

/**
 * Formats a date string for display

 * @param {string} dateString 
 * @returns {string} 
 */
export function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-LK', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(date);
}

/**
 * Gets unique postcodes from properties array

 * @param {Array} properties
 * @returns {Array} 
 */
export function getUniquePostcodes(properties) {
    const postcodes = properties.map(p => p.postcode);
    return [...new Set(postcodes)].sort();
}





    
