export abstract class IQuery {
    abstract randomImage(): string | Promise<string>;

    abstract temp__(): boolean | Promise<boolean>;
}

export type Date = any;
export type JSON = any;
