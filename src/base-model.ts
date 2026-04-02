/**
 * Base interface for all TeqBench domain models
 *
 * @remarks
 * Every persistable entity in the TeqBench framework extends this contract,
 * ensuring a consistent shape for identity and audit timestamps across all
 * `@teqbench` packages.
 *
 * @typeParam TId - The type used for the model's unique identifier.
 *   Defaults to `string` (typically a UUID v4), but can be narrowed to
 *   `number`, a branded type, or any other identifier strategy.
 *
 * @usage
 * Extend this interface for every domain entity that will be persisted.
 * The generic parameter allows adapting the identifier type to the
 * backing data store (e.g., `string` for UUIDs, `number` for
 * auto-increment keys).
 *
 * @example
 * ```typescript
 * // Default string identifier
 * interface User extends TbxModel {
 *     email: string;
 * }
 *
 * // Numeric identifier
 * interface LegacyRecord extends TbxModel<number> {
 *     label: string;
 * }
 * ```
 *
 * @category Models
 * @category Foundational
 * @displayName Base Model
 * @order 1
 * @since 1.0.0
 *
 * @public
 */
export interface TbxModel<TId = string> {
    /**
     * Unique identifier for the model instance
     *
     * @remarks
     * The concrete type is determined by the `TId` generic parameter.
     * When omitted, `TId` defaults to `string`.
     *
     * @order 1
     *
     * @public
     */
    readonly id: TId;

    /**
     * ISO-8601 timestamp indicating when the record was created
     *
     * @remarks
     * Set once at creation time and never modified thereafter.
     *
     * @order 2
     *
     * @public
     */
    readonly createdAt: string;

    /**
     * ISO-8601 timestamp indicating when the record was last updated
     *
     * @remarks
     * Updated automatically whenever the record is persisted with changes.
     *
     * @order 3
     *
     * @public
     */
    readonly updatedAt: string;
}
