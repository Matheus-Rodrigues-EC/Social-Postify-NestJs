export class mediasFactoryEntity {
    private _id?: number;
    private _title: string;
    private _username: string;

    constructor(title: string, username: string, id?: number,){
        this._id = id;
        this._title = title;
        this._username = username;
    }

    public get id() : number {
        return this._id; 
    }
    
    public get title() : string {
        return this._title; 
    }
    
    public get username() : string {
        return this._username; 
    }

}