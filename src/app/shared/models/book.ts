import { IAuthor } from "./author";
import { ILocation } from "./location";

export interface IBook{
    id:string,
    isbnCode:string,
    bookTitle:string,
    imageUrl:File,
    bookEdition:number,
    releaseDate:number,
    status?:EBookStatus,
    categoryName?:string,
    categoryId?:string,
    publisherName?:string,
    publisherId?:string,
    authors:IAuthor[],
    location?:ILocation,
    locationId?:string,
    pageCount:number
}
export enum EBookStatus
{
    Unavailable,
    Available,
    Reserved,
    Borrowed
}
