export class postsFactoryEntity {
    private _id?: number;
    private _title: string;
    private _text: string;
    private _image?: string;

    constructor(title: string, text: string, image?: string, id?: number){
        this._id = id;
        this._title = title;
        this._text = text;
        this._image = image;
    }

    public get id() : number {
        return this._id; 
    }

    public get title() : string {
        return this._title; 
    }

    public get text() : string {
        return this._text; 
    }

    public get image() : string {
        return this._image; 
    }
}