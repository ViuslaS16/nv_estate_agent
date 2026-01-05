/* JEST Configuration. */
export default {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    moduleNameMapper: {
        // Handle CSS imports
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/__mocks__/fileMock.js',
    },

    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },

    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.{js,jsx}',
        '<rootDir>/src/**/*.{test,spec}.{js,jsx}',
    ],

    testPathIgnorePatterns: ['/node_modules/'],
    collectCoverageFrom: [
        'src/**/*.{js,jsx}',
        '!src/main.jsx',
        '!src/**/*.test.{js,jsx}',
        '!src/__tests__/**',
        '!src/__mocks__/**',
    ],

    verbose: true,
};
