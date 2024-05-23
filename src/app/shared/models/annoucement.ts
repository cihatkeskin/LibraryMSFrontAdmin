export interface IAnnoucement{
    id:string,
    title:string,
    content:string,
    tag:EAnnoucementTag,
    file:File,
    imageUrl?:File
}
export enum EAnnoucementTag{
    Announcement,
    Event,
    News,
}