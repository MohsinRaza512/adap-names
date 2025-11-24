/**
 * Name interface for B04 – including contract expectations.
 *
 * Contract:
 * - Preconditions: indexes must be valid, component must not be null/undefined
 * - Postconditions: modifications must be visible via getComponent/getLength
 * - Class invariants: length >= 0, components never null/undefined
 */
export interface Name {
    getLength(): number;
    getComponent(index: number): string;

    setComponent(index: number, c: string): void;
    insert(index: number, c: string): void;
    append(c: string): void;
    remove(index: number): void;

    asString(delimiter?: string): string;
    asDataString(): string;
}
