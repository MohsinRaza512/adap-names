import { Printable } from "../common/Printable";

/**
 * A name is a sequence of string components separated by a delimiter character.
 * Special characters within the string may need masking, if they are to appear verbatim.
 * There are only two special characters, the delimiter character and the escape character.
 * The escape character can't be set, the delimiter character can.
 * 
 * Homogenous name examples
 * 
 * "oss.cs.fau.de" is a name with four name components and the delimiter character '.'.
 * "///" is a name with four empty components and the delimiter character '/'.
 * "Oh\\.\.\." is a name with one component, if the delimiter character is '.'.
 */
export abstract class Name implements Printable {

  protected delimiter: string;
  protected components: string[];

  constructor(other: string[], delimiter: string = ".") {
    this.components = [...other];
    this.delimiter = delimiter;
  }

  // --- Required by Printable interface ---
  public getDelimiterCharacter(): string {
    return this.delimiter;
  }

  // --- Abstract methods (to be implemented by subclasses) ---

  public abstract isEmpty(): boolean;

  public abstract getNoComponents(): number;

  public abstract getComponent(i: number): string;

  public abstract setComponent(i: number, c: string): void;

  public abstract insert(i: number, c: string): void;

  public abstract append(c: string): void;

  public abstract remove(i: number): void;

  public abstract concat(other: Name): void;

  public abstract asString(delimiter?: string): string;

  public abstract asDataString(): string;
}
