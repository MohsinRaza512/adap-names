import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(initial?: string[]) {
        super();
        if (initial) this.components = [...initial];
    }

    protected doGetLength(): number {
        return this.components.length;
    }

    protected doGetComponent(index: number): string {
        return this.components[index];
    }

    protected doSetComponent(index: number, c: string): void {
        this.components[index] = c;
    }

    protected doInsert(index: number, c: string): void {
        this.components.splice(index, 0, c);
    }

    protected doRemove(index: number): void {
        this.components.splice(index, 1);
    }
}
