import { IsNumber, IsNotEmpty, IsString } from "class-validator";

export class createPublicationDTO {

    @IsNumber()
    @IsNotEmpty()
    mediaId: number;

    @IsNumber()
    @IsNotEmpty()
    postId: number;

    @IsString()
    @IsNotEmpty()
    date: string;

}