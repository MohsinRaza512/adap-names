import { Name } from "./Name";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";

export abstract class AbstractName implements Name {

    // ============================================================
    // PUBLIC METHODS WITH CONTRACTS
    // ============================================================

    public getLength(): number {
        const len = this.doGetLength();
        this.assertInvariant();
        return len;
    }

    public getComponent(index: number): string {
        this.assertPreIndex(index);
        const value = this.doGetComponent(index);
        this.assertInvariant();
        return value;
    }

    public setComponent(index: number, c: string): void {
        this.assertPreIndex(index);
        this.assertPreValue(c);

        const before = this.snapshot();
        this.doSetComponent(index, c);

        MethodFailedException.assert(this.doGetComponent(index) === c,
            "postcondition failed: setComponent");

        this.assertInvariant();
    }

    public insert(index: number, c: string): void {
        this.assertPreInsertIndex(index);
        this.assertPreValue(c);

        const oldLen = this.doGetLength();
        const before = this.snapshot();

        this.doInsert(index, c);

        MethodFailedException.assert(this.doGetLength() === oldLen + 1,
            "postcondition failed: insert length");
        MethodFailedException.assert(this.doGetComponent(index) === c,
            "postcondition failed: insert value");

        this.assertInvariant();
    }

    public append(c: string): void {
        this.assertPreValue(c);

        const index = this.doGetLength();
        const before = this.snapshot();

        this.doInsert(index, c);

        MethodFailedException.assert(this.doGetComponent(index) === c,
            "postcondition failed: append");

        this.assertInvariant();
    }

    public remove(index: number): void {
        this.assertPreIndex(index);

        const oldLen = this.doGetLength();
        const before = this.snapshot();

        this.doRemove(index);

        MethodFailedException.assert(this.doGetLength() === oldLen - 1,
            "postcondition failed: remove");

        this.assertInvariant();
    }

    public asString(delimiter: string = "/"): string {
        const len = this.doGetLength();
        let out = "";
        for (let i = 0; i < len; i++) {
            if (i > 0) out += delimiter;
            out += this.doGetComponent(i);
        }
        this.assertInvariant();
        return out;
    }

    public asDataString(): string {
        return this.asString("/");
    }

    // ============================================================
    // PROTECTED ABSTRACT PRIMITIVES
    // ============================================================

    protected abstract doGetLength(): number;
    protected abstract doGetComponent(index: number): string;

    protected abstract doSetComponent(index: number, c: string): void;
    protected abstract doInsert(index: number, c: string): void;
    protected abstract doRemove(index: number): void;

    // ============================================================
    // CONTRACT HELPERS
    // ============================================================

    protected snapshot(): string[] {
        const list: string[] = [];
        const len = this.doGetLength();
        for (let i = 0; i < len; i++) list.push(this.doGetComponent(i));
        return list;
    }

    protected assertPreIndex(index: number): void {
        IllegalArgumentException.assert(
            index >= 0 && index < this.doGetLength(),
            "index out of range"
        );
    }

    protected assertPreInsertIndex(index: number): void {
        IllegalArgumentException.assert(
            index >= 0 && index <= this.doGetLength(),
            "invalid insert index"
        );
    }

    protected assertPreValue(c: string): void {
        IllegalArgumentException.assert(
            c !== null && c !== undefined,
            "component may not be null or undefined"
        );
    }

    protected assertInvariant(): void {
        InvalidStateException.assert(
            this.doGetLength() >= 0,
            "invariant: length must be >= 0"
        );
    }
}
