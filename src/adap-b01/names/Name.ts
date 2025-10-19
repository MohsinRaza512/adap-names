export const DEFAULT_DELIMITER: string = '.';
export const ESCAPE_CHARACTER = '\\';

export class Name {

    private delimiter: string = DEFAULT_DELIMITER;
    private components: string[] = [];

    // @methodtype constructor
    constructor(other: string[], delimiter?: string) {
        this.delimiter = delimiter ?? DEFAULT_DELIMITER;
        // Defensive copy: avoid modifying external array
        this.components = Array.isArray(other) ? [...other] : [];
    }

    // @methodtype query
    public asString(delimiter: string = this.delimiter): string {
        // Join safely even if components are empty
        return this.components.join(delimiter);
    }

    // @methodtype query
    public asDataString(): string {
        // Machine-readable: escape the delimiter and escape char
        return this.components
            .map(c =>
                c
                    .replaceAll(ESCAPE_CHARACTER, ESCAPE_CHARACTER + ESCAPE_CHARACTER)
                    .replaceAll(this.delimiter, ESCAPE_CHARACTER + this.delimiter)
            )
            .join(this.delimiter);
    }

    // @methodtype query
    public getComponent(i: number): string {
        if (i < 0 || i >= this.components.length)
            throw new RangeError(`Invalid index ${i}`);
        return this.components[i];
    }

    // @methodtype mutation
    public setComponent(i: number, c: string): void {
        if (i < 0 || i >= this.components.length)
            throw new RangeError(`Invalid index ${i}`);
        this.components[i] = c;
    }

    // @methodtype query
    public getNoComponents(): number {
        return this.components.length;
    }

    // @methodtype mutation
    public insert(i: number, c: string): void {
        if (i < 0 || i > this.components.length)
            throw new RangeError(`Invalid index ${i}`);
        this.components.splice(i, 0, c);
    }

    // @methodtype mutation
    public append(c: string): void {
        this.components.push(c);
    }

    // @methodtype mutation
    public remove(i: number): void {
        if (i < 0 || i >= this.components.length)
            throw new RangeError(`Invalid index ${i}`);
        this.components.splice(i, 1);
    }
}
