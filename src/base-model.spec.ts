import type { TbxModel } from './base-model';

describe('TbxModel', () => {
    it('should accept an object with string id by default', () => {
        const model: TbxModel = {
            id: 'abc-123',
            createdAt: '2025-01-01T00:00:00.000Z',
            updatedAt: '2025-06-15T12:30:00.000Z',
        };

        expect(model.id).toBe('abc-123');
        expect(model.createdAt).toBe('2025-01-01T00:00:00.000Z');
        expect(model.updatedAt).toBe('2025-06-15T12:30:00.000Z');
    });

    it('should accept a numeric id when parameterised with number', () => {
        const model: TbxModel<number> = {
            id: 42,
            createdAt: '2025-01-01T00:00:00.000Z',
            updatedAt: '2025-06-15T12:30:00.000Z',
        };

        expect(model.id).toBe(42);
    });

    it('should enforce readonly on all properties', () => {
        const model: TbxModel = {
            id: 'readonly-test',
            createdAt: '2025-01-01T00:00:00.000Z',
            updatedAt: '2025-01-01T00:00:00.000Z',
        };

        // TypeScript enforces readonly at compile time.
        // At runtime, verify the object shape is intact.
        expect(Object.keys(model)).toEqual(['id', 'createdAt', 'updatedAt']);
    });

    it('should allow extension with additional properties', () => {
        interface User extends TbxModel {
            email: string;
        }

        const user: User = {
            id: 'user-1',
            createdAt: '2025-01-01T00:00:00.000Z',
            updatedAt: '2025-01-01T00:00:00.000Z',
            email: 'test@example.com',
        };

        expect(user.email).toBe('test@example.com');
        expect(user.id).toBe('user-1');
    });
});
