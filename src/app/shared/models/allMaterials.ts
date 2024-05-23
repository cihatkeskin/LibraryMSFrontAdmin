export interface IMagazine{
    id:string,
    issnCode:string,
    magazineTitle:string,
    releaseDate:Date,
    number:number,
    publisherId:string,
    publisherName?:string,
    categoryName?:string,
    categoryId:string
}
export interface IMaterial{
    id:string,
    name:string,
    releaseDate:number,
    publisherId:string,
    categoryId:string,
    publisherName?:string,
    categoryName?:string,
    materialType:EMaterialType
}
export interface IEBook{
    id:string,
    isbnCode:string,
    eBookTitle:string,
    authorName:string,
    releaseDate:number,
    pageCount:number,
    categoryId?:string,
    categoryName:string,
    fileUrl:File,
    imageUrl:File
}
export  enum EMaterialType{
    Newspapers = 0,
    Artworks = 1 ,
    Maps = 2
}