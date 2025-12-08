import { Node } from "./Node";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set<Node>();

    constructor(bn: string, pn: Directory) {
        super(bn, pn);
        this.assertClassInvariant();
    }

    public hasChildNode(cn: Node): boolean {
        IllegalArgumentException.assert(
            cn !== null && cn !== undefined,
            "child node must not be null"
        );
        return this.childNodes.has(cn);
    }

    public addChildNode(cn: Node): void {
        IllegalArgumentException.assert(
            cn !== null && cn !== undefined,
            "child node must not be null"
        );
        InvalidStateException.assert(
            cn !== this,
            "directory cannot contain itself"
        );

        const before = this.childNodes.size;
        this.childNodes.add(cn);

        // either size increased or the node was already there
        MethodFailedException.assert(
            this.childNodes.size === before + 1 || this.childNodes.has(cn),
            "failed to add child node"
        );

        this.assertClassInvariant();
    }

    public removeChildNode(cn: Node): void {
        IllegalArgumentException.assert(
            cn !== null && cn !== undefined,
            "child node must not be null"
        );
        InvalidStateException.assert(
            this.childNodes.has(cn),
            "child node not found"
        );

        const before = this.childNodes.size;
        this.childNodes.delete(cn);

        MethodFailedException.assert(
            this.childNodes.size === before - 1,
            "failed to remove child node"
        );

        this.assertClassInvariant();
    }

    /**
     * Directory-specific class invariant:
     *  - all children are non-null
     *  - all children have this as parent
     *  - directory does not contain itself
     */
    protected assertClassInvariant(): void {
        for (const child of this.childNodes) {
            InvalidStateException.assert(
                child !== null && child !== undefined,
                "directory contains invalid child"
            );
            InvalidStateException.assert(
                child.getParentNode() === this,
                "child node has incorrect parent"
            );
            InvalidStateException.assert(
                child !== this,
                "directory cannot contain itself"
            );
        }
    }
}
