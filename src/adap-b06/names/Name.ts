export interface Name {

    // queries
    getLength(): number;
    getComponent(index: number): string;

    // value-object operations (RETURN NEW OBJECTS)
    setComponent(index: number, c: string): Name;
    insert(index: number, c: string): Name;
    append(c: string): Name;
    remove(index: number): Name;

    // representation
    asString(delimiter?: string): string;
    asDataString(): string;

    // value equality
    isEqual(other: Name): boolean;
}
