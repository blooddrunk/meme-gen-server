export class Canvas {
    currentImage?: RemoteImage;
}

export abstract class IQuery {
    abstract canvas(): Canvas | Promise<Canvas>;

    abstract randomImage(): RemoteImage | Promise<RemoteImage>;

    abstract temp__(): boolean | Promise<boolean>;
}

export class RemoteImage {
    id: string;
    url?: string;
}

export type Date = any;
export type JSON = any;
