import { Name } from "./Name";

export abstract class AbstractName implements Name {

    // ---- Query Methods ----

    public getLength(): number {
        return this.doGetLength();
    }

    public getComponent(index: number): string {
        return this.doGetComponent(index);
    }

    // ---- Mutation Methods ----

    public setComponent(index: number, c: string): void {
        this.doSetComponent(index, c);
    }

    public insert(index: number, c: string): void {
        this.doInsert(index, c);
    }

    public remove(index: number): void {
        this.doRemove(index);
    }

    public append(c: string): void {
        this.insert(this.getLength(), c);
    }

    // ---- Conversion Methods ----

    public asString(delimiter: string = "/"): string {
        let s = "";
        for (let i = 0; i < this.getLength(); i++) {
            if (i > 0) s += delimiter;
            s += this.getComponent(i);
        }
        return s;
    }

    public asDataString(): string {
        return this.asString("/");
    }

    // ---- Primitive Inheritance Interface ----
    protected abstract doGetLength(): number;
    protected abstract doGetComponent(index: number): string;
    protected abstract doSetComponent(index: number, c: string): void;
    protected abstract doInsert(index: number, c: string): void;
    protected abstract doRemove(index: number): void;
}
