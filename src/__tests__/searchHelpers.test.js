import { filterProperties, validateSearchCriteria, formatPrice, formatDate } from '../utils/searchHelpers';

const mockProperties = [
    {
        id: 'prop-001',
        type: 'house',
        price: 695000,
        bedrooms: 4,
        dateAdded: '2025-07-15',
        postcode: 'BR1',
        location: '45 Oak Avenue, Bromley',
        description: 'Victorian house'
    },
    {
        id: 'prop-002',
        type: 'flat',
        price: 375000,
        bedrooms: 2,
        dateAdded: '2025-08-22',
        postcode: 'NW1',
        location: 'Camden Heights',
        description: 'Modern flat'
    },
    {
        id: 'prop-003',
        type: 'house',
        price: 825000,
        bedrooms: 5,
        dateAdded: '2025-09-10',
        postcode: 'SW1',
        location: 'Belgravia Gardens',
        description: 'Georgian townhouse'
    },
    {
        id: 'prop-004',
        type: 'bungalow',
        price: 450000,
        bedrooms: 3,
        dateAdded: '2025-10-05',
        postcode: 'CR0',
        location: 'Meadow Lane, Croydon',
        description: 'Detached bungalow'
    },
    {
        id: 'prop-005',
        type: 'flat',
        price: 165000,
        bedrooms: 1,
        dateAdded: '2025-12-20',
        postcode: 'W2',
        location: 'Westbourne Grove',
        description: 'Garden flat'
    }
];

describe('filterProperties', () => {
    test('returns all properties when no criteria specified', () => {
        const result = filterProperties(mockProperties, {});
        expect(result).toHaveLength(5);
        expect(result).toEqual(mockProperties);
    });

    test('filters properties by type correctly', () => {
        const result = filterProperties(mockProperties, { type: 'flat' });
        expect(result).toHaveLength(2);
        expect(result.every(p => p.type === 'flat')).toBe(true);
    });

    test('returns all properties when type is "any"', () => {
        const result = filterProperties(mockProperties, { type: 'any' });
        expect(result).toHaveLength(5);
    });

    test('filters properties by minimum price', () => {
        const result = filterProperties(mockProperties, { minPrice: 400000 });
        expect(result).toHaveLength(3);
        expect(result.every(p => p.price >= 400000)).toBe(true);
    });

    test('filters properties by maximum price', () => {
        const result = filterProperties(mockProperties, { maxPrice: 400000 });
        expect(result).toHaveLength(2);
        expect(result.every(p => p.price <= 400000)).toBe(true);
    });

    test('filters properties by price range', () => {
        const result = filterProperties(mockProperties, { minPrice: 300000, maxPrice: 500000 });
        expect(result).toHaveLength(2);
        expect(result.every(p => p.price >= 300000 && p.price <= 500000)).toBe(true);
    });

    test('filters properties by minimum bedrooms', () => {
        const result = filterProperties(mockProperties, { minBedrooms: 3 });
        expect(result).toHaveLength(3);
        expect(result.every(p => p.bedrooms >= 3)).toBe(true);
    });

    test('filters properties by maximum bedrooms', () => {
        const result = filterProperties(mockProperties, { maxBedrooms: 2 });
        expect(result).toHaveLength(2);
        expect(result.every(p => p.bedrooms <= 2)).toBe(true);
    });

    test('filters properties added after a specific date', () => {
        const result = filterProperties(mockProperties, { dateAfter: '2025-10-01' });
        expect(result).toHaveLength(2);
        result.forEach(p => {
            expect(new Date(p.dateAdded) >= new Date('2025-10-01')).toBe(true);
        });
    });

    test('filters properties within date range', () => {
        const result = filterProperties(mockProperties, {
            dateFrom: '2025-08-01',
            dateTo: '2025-10-31'
        });
        expect(result).toHaveLength(3);
    });

    test('filters properties by postcode prefix (case-insensitive)', () => {
        const result = filterProperties(mockProperties, { postcode: 'nw1' });
        expect(result).toHaveLength(1);
        expect(result[0].postcode).toBe('NW1');
    });

    test('filters properties by partial postcode', () => {
        const result = filterProperties(mockProperties, { postcode: 'N' });
        expect(result).toHaveLength(1);
        expect(result[0].postcode.startsWith('N')).toBe(true);
    });

    test('filters by type AND price range', () => {
        const result = filterProperties(mockProperties, {
            type: 'house',
            minPrice: 500000
        });
        expect(result).toHaveLength(2);
        expect(result.every(p => p.type === 'house' && p.price >= 500000)).toBe(true);
    });

    test('filters by type, price, AND bedrooms', () => {
        const result = filterProperties(mockProperties, {
            type: 'flat',
            maxPrice: 400000,
            minBedrooms: 2
        });
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe('prop-002');
    });

    test('filters using all 5 criteria simultaneously', () => {
        const result = filterProperties(mockProperties, {
            type: 'house',
            minPrice: 600000,
            maxPrice: 900000,
            minBedrooms: 4,
            dateAfter: '2025-07-01',
            postcode: 'BR'
        });
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe('prop-001');
    });

    test('returns empty array when no properties match', () => {
        const result = filterProperties(mockProperties, {
            type: 'house',
            maxPrice: 100000
        });
        expect(result).toHaveLength(0);
        expect(result).toEqual([]);
    });

    test('ignores empty string criteria', () => {
        const result = filterProperties(mockProperties, {
            type: 'house',
            postcode: ''
        });
        expect(result).toHaveLength(2);
    });
});

describe('validateSearchCriteria', () => {
    test('returns valid for correct criteria', () => {
        const result = validateSearchCriteria({
            minPrice: 100000,
            maxPrice: 500000,
            minBedrooms: 2,
            maxBedrooms: 4
        });
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
    });

    test('returns error when minPrice > maxPrice', () => {
        const result = validateSearchCriteria({
            minPrice: 500000,
            maxPrice: 100000
        });
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Minimum price cannot be greater than maximum price');
    });

    test('returns error when minBedrooms > maxBedrooms', () => {
        const result = validateSearchCriteria({
            minBedrooms: 5,
            maxBedrooms: 2
        });
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Minimum bedrooms cannot be greater than maximum bedrooms');
    });

    test('returns error when dateFrom > dateTo', () => {
        const result = validateSearchCriteria({
            dateFrom: '2025-12-01',
            dateTo: '2025-01-01'
        });
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Start date cannot be after end date');
    });
});

