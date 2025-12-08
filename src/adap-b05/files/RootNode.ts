import { Name } from "../names/Name";
import { StringName } from "../names/StringName";
import { Directory } from "./Directory";
import { InvalidStateException } from "../common/InvalidStateException";

export class RootNode extends Directory {

    protected static ROOT_NODE: RootNode = new RootNode();

    public static getRootNode(): RootNode {
        return this.ROOT_NODE;
    }

    constructor() {
        // Root has no real parent; we pass a dummy and fix parentNode.
        super("", null as any);
        this.parentNode = this;
    }

    protected initialize(pn: Directory): void {
        // Root is its own parent and is not added as a child anywhere.
        this.parentNode = this;
    }

    public getFullName(): Name {
        // Root is represented by the empty name.
        return new StringName("", "/");
    }

    public move(to: Directory): void {
        // Root cannot be moved – do nothing.
    }

    protected doSetBaseName(bn: string): void {
        // Root base name is always empty and cannot change.
    }

    protected assertClassInvariant(): void {
        // Root-specific invariant: parent must be itself.
        InvalidStateException.assert(
            this.parentNode === this,
            "RootNode must be its own parent"
        );
    }
}
