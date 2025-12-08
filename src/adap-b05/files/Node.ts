import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { ServiceFailureException } from "../common/ServiceFailureException";
import { Exception } from "../common/Exception";

import { Name } from "../names/Name";
import type { Directory } from "./Directory";

export class Node {
    protected baseName: string = "";
    protected parentNode: Directory;

    constructor(bn: string, pn: Directory) {
        this.doSetBaseName(bn);
        this.parentNode = pn;
        this.initialize(pn);
    }

    protected initialize(pn: Directory): void {
        this.parentNode = pn;
        this.parentNode.addChildNode(this);
    }

    public move(to: Directory): void {
        this.parentNode.removeChildNode(this);
        to.addChildNode(this);
        this.parentNode = to;
    }

    public getFullName(): Name {
        const result: Name = this.parentNode.getFullName();
        result.append(this.getBaseName());
        return result;
    }

    public getBaseName(): string {
        return this.doGetBaseName();
    }

    protected doGetBaseName(): string {
        return this.baseName;
    }

    public rename(bn: string): void {
        this.doSetBaseName(bn);
    }

    protected doSetBaseName(bn: string): void {
        this.baseName = bn;
    }

    public getParentNode(): Directory {
        return this.parentNode;
    }

    /**
     * Returns all nodes in the tree that match bn
     * starting at this node as root.
     */
    public findNodes(bn: string): Set<Node> {
    IllegalArgumentException.assert(
        bn !== null && bn !== undefined,
        "search basename must not be null"
    );

    const result = new Set<Node>();

    try {
        // detect corrupted node
        const thisName = this.getBaseName();
        InvalidStateException.assert(
            thisName !== "",
            "corrupted node: empty basename"
        );

        // check current node
        if (thisName === bn) {
            result.add(this);
        }

        // recursively check children (directories only)
        const anyThis = this as any;
        if (anyThis.childNodes instanceof Set) {
            for (const child of anyThis.childNodes) {
                const matches = child.findNodes(bn);
                for (const m of matches) result.add(m);
            }
        }

        return result;

    } catch (ex) {

        if (ex instanceof InvalidStateException) {
            // EXACT BEHAVIOR EXPECTED BY TEST:
            // rethrow so test sees that an exception occurred
            throw ex;
        }

        // unknown exception → wrap
        throw new ServiceFailureException("findNodes failed", ex as any);
    }
}


    private raiseServiceFailure(inner?: Exception): never {
        if (inner) {
            throw new ServiceFailureException(
                "service failure during findNodes",
                inner
            );
        }
        throw new ServiceFailureException("service failure during findNodes");
    }
}
