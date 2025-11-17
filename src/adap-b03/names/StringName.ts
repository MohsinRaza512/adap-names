import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected raw: string = "";
    protected delimiter: string;

    constructor(raw: string = "", delimiter: string = "/") {
        super();
        this.raw = raw;
        this.delimiter = delimiter;
    }

    // Utility helpers
    private parts(): string[] {
        if (this.raw === "") return [];
        return this.raw.split(this.delimiter);
    }

    private update(parts: string[]): void {
        this.raw = parts.join(this.delimiter);
    }

    // ---- Primitive Methods ----

    protected doGetLength(): number {
        return this.parts().length;
    }

    protected doGetComponent(index: number): string {
        return this.parts()[index];
    }

    protected doSetComponent(index: number, c: string): void {
        let p = this.parts();
        p[index] = c;
        this.update(p);
    }

    protected doInsert(index: number, c: string): void {
        let p = this.parts();
        p.splice(index, 0, c);
        this.update(p);
    }

    protected doRemove(index: number): void {
        let p = this.parts();
        p.splice(index, 1);
        this.update(p);
    }
}
