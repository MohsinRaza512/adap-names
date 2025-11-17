export interface Name {

    // Query methods
    getLength(): number;
    getComponent(index: number): string;

    // Mutation methods
    setComponent(index: number, c: string): void;
    insert(index: number, c: string): void;
    append(c: string): void;
    remove(index: number): void;

    // Conversion
    asString(delimiter?: string): string;
    asDataString(): string;
}
