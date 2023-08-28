export class publicationsFactoryEntity {
    private _id?: number;
    private _mediaId: number;
    private _postId: number;
    private _date: string;

    constructor(mediaId: number, postId: number, date: string, id?: number){
        this._id = id;
        this._mediaId = mediaId;
        this._postId = postId;
        this._date = date;
    }

    public get id() : number {
        return this._id; 
    }

    public get mediaId() : number {
        return this._mediaId; 
    }

    public get postId() : number {
        return this._postId; 
    }

    public get date() : string {
        return this._date; 
    }
}