import { Name } from "./Name";

export class StringName extends Name {

  private name: string;

  constructor(source: string, delimiter: string = ".") {
    super([], delimiter); // call parent Name constructor first
    this.name = source;
  }

  public isEmpty(): boolean {
    return this.name.length === 0;
  }

  public getNoComponents(): number {
    return this.name.split(this.delimiter).length;
  }

  public getComponent(i: number): string {
    return this.name.split(this.delimiter)[i];
  }

  public setComponent(i: number, c: string): void {
    const parts = this.name.split(this.delimiter);
    parts[i] = c;
    this.name = parts.join(this.delimiter);
  }

  public insert(i: number, c: string): void {
    const parts = this.name.split(this.delimiter);
    parts.splice(i, 0, c);
    this.name = parts.join(this.delimiter);
  }

  public append(c: string): void {
    this.name += this.delimiter + c;
  }

  public remove(i: number): void {
    const parts = this.name.split(this.delimiter);
    parts.splice(i, 1);
    this.name = parts.join(this.delimiter);
  }

  public concat(other: Name): void {
    for (let i = 0; i < other.getNoComponents(); i++) {
      this.append(other.getComponent(i));
    }
  }

  public asString(delimiter: string = this.delimiter): string {
    return this.name.split(this.delimiter).join(delimiter);
  }

  public asDataString(): string {
    return this.name;
  }
}
