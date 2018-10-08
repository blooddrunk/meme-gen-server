export abstract class IQuery {
    abstract randomImage(): JSON | Promise<JSON>;

    abstract temp__(): boolean | Promise<boolean>;
}

export type Date = any;
export type JSON = any;
