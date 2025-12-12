import { Name } from "./Name";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export abstract class AbstractName implements Name {

    // -----------------------------
    // value-object API
    // -----------------------------

    public setComponent(index: number, c: string): Name {
        this.assertIndex(index);
        this.assertValue(c);

        const copy = this.copy();
        copy.doSetComponent(index, c);
        return copy;
    }

    public insert(index: number, c: string): Name {
        this.assertInsertIndex(index);
        this.assertValue(c);

        const copy = this.copy();
        copy.doInsert(index, c);
        return copy;
    }

    public append(c: string): Name {
        return this.insert(this.getLength(), c);
    }

    public remove(index: number): Name {
        this.assertIndex(index);

        const copy = this.copy();
        copy.doRemove(index);
        return copy;
    }

    // -----------------------------
    // equality (VALUE-BASED)
    // -----------------------------

    public isEqual(other: Name): boolean {
        if (this.getLength() !== other.getLength()) return false;

        for (let i = 0; i < this.getLength(); i++) {
            if (this.getComponent(i) !== other.getComponent(i)) {
                return false;
            }
        }
        return true;
    }

    // -----------------------------
    // representations
    // -----------------------------

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

    // -----------------------------
    // abstract primitive operations
    // -----------------------------

    protected abstract copy(): AbstractName;

    protected abstract doGetLength(): number;
    protected abstract doGetComponent(index: number): string;
    protected abstract doSetComponent(index: number, c: string): void;
    protected abstract doInsert(index: number, c: string): void;
    protected abstract doRemove(index: number): void;

    // -----------------------------
    // shared checks
    // -----------------------------

    public getLength(): number {
    return this.doGetLength();
    }

    public getComponent(index: number): string {
    return this.doGetComponent(index);
    }


    protected assertIndex(index: number): void {
        IllegalArgumentException.assert(
            index >= 0 && index < this.getLength(),
            "index out of range"
        );
    }

    protected assertInsertIndex(index: number): void {
        IllegalArgumentException.assert(
            index >= 0 && index <= this.getLength(),
            "invalid insert index"
        );
    }

    protected assertValue(c: string): void {
        IllegalArgumentException.assert(
            c !== null && c !== undefined,
            "component must not be null"
        );
    }
}
