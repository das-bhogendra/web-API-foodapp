export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src', '<rootDir>/_tests_'],
    testMatch: ['**/_tests_/**/*.test.ts'],
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/**/*.d.ts',
        '!src/index.ts',
        '!src/app.ts',
        '!src/_tests_/**',
    ],
    setupFilesAfterEnv: ['<rootDir>/_tests_/setup.ts'],
};
