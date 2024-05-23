import { IEBook, IMagazine, IMaterial } from "./allMaterials";
import { IBook } from "./book";

export interface ICatalog{
    id:string,
    name:string,
    imageUrl:string,
    books:IBook[],
    magazines:IMagazine[],
    materials:IMaterial[],
    eBooks:IEBook[]
}