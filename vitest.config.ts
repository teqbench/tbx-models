import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        passWithNoTests: false,
        coverage: {
            // No exclusions: every source file should contribute to coverage.
            // Interface-only files compile to zero runtime code, so V8 has
            // nothing to miss and they do not need to be excluded explicitly.
            thresholds: {
                lines: 80,
                functions: 80,
                statements: 80,
                branches: 75,
                perFile: true,
            },
        },
    },
});
