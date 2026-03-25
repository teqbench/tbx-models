/**
 * Base interface for all TeqBench domain models.
 *
 * Every persistable entity in the TeqBench framework extends this contract,
 * ensuring a consistent shape for identity and audit timestamps across all
 * `@teqbench` packages.
 *
 * @typeParam TId - The type used for the model's unique identifier.
 *   Defaults to `string` (typically a UUID v4), but can be narrowed to
 *   `number`, a branded type, or any other identifier strategy.
 *
 * @example
 * ```typescript
 * // Default string identifier
 * interface User extends BaseModel {
 *     email: string;
 * }
 *
 * // Numeric identifier
 * interface LegacyRecord extends BaseModel<number> {
 *     label: string;
 * }
 * ```
 */
export interface BaseModel<TId = string> {
    /**
     * Unique identifier for the model instance.
     *
     * The concrete type is determined by the `TId` generic parameter.
     * When omitted, `TId` defaults to `string`.
     */
    readonly id: TId;

    /**
     * ISO-8601 timestamp indicating when the record was created.
     *
     * Set once at creation time and never modified thereafter.
     */
    readonly createdAt: string;

    /**
     * ISO-8601 timestamp indicating when the record was last updated.
     *
     * Updated automatically whenever the record is persisted with changes.
     */
    readonly updatedAt: string;
}
