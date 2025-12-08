import { Node } from "./Node";
import { Directory } from "./Directory";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";

enum FileState {
    OPEN,
    CLOSED,
    DELETED
}

export class File extends Node {

    protected state: FileState = FileState.CLOSED;

    constructor(baseName: string, parent: Directory) {
        super(baseName, parent);
        this.assertClassInvariant();
    }

    // ------------------------------------------------------------
    // Contract helpers
    // ------------------------------------------------------------

    protected assertClassInvariant(): void {
        const valid =
            this.state === FileState.OPEN ||
            this.state === FileState.CLOSED ||
            this.state === FileState.DELETED;

        InvalidStateException.assert(valid, "invalid file state");
    }

    public open(): void {
        // Preconditions
        InvalidStateException.assert(
            this.state !== FileState.DELETED,
            "cannot open a deleted file"
        );
        InvalidStateException.assert(
            this.state !== FileState.OPEN,
            "file is already open"
        );

        // Transition
        this.state = FileState.OPEN;

        // Postcondition
        MethodFailedException.assert(
            this.state === FileState.OPEN,
            "failed to open file"
        );

        this.assertClassInvariant();
    }

    public read(noBytes: number): Int8Array {
        // Preconditions
        IllegalArgumentException.assert(
            noBytes > 0,
            "number of bytes to read must be positive"
        );
        InvalidStateException.assert(
            this.state === FileState.OPEN,
            "cannot read a file that is not open"
        );

        const result = new Int8Array(noBytes);
        let tries = 0;

        for (let i = 0; i < noBytes; i++) {
            try {
                result[i] = this.readNextByte();
            } catch (ex) {
                tries++;
                if (ex instanceof MethodFailedException) {
                    // Resumption: on read error, return 0 for this byte and continue
                    result[i] = 0;
                    continue;
                } else {
                    // Unknown exception: propagate
                    throw ex;
                }
            }
        }

        // Postcondition: reading must not corrupt file state
        MethodFailedException.assert(
            this.state === FileState.OPEN,
            "file state corrupted during read"
        );

        this.assertClassInvariant();
        return result;
    }

    protected readNextByte(): number {
        // In the homework setup, there is no real backing store,
        // so the default implementation just returns 0.
        return 0;
    }

    public close(): void {
        // Preconditions
        InvalidStateException.assert(
            this.state !== FileState.DELETED,
            "cannot close a deleted file"
        );
        InvalidStateException.assert(
            this.state === FileState.OPEN,
            "cannot close a file that is not open"
        );

        // Transition
        this.state = FileState.CLOSED;

        // Postcondition
        MethodFailedException.assert(
            this.state === FileState.CLOSED,
            "failed to close file"
        );

        this.assertClassInvariant();
    }

    protected doGetFileState(): FileState {
        return this.state;
    }
}
