export interface IReservation{
    bookId:string,
    memberId:string,
    nearestAvailableDate:Date,
    requestDate:Date,
    bookBookTitle:string,
    memberFirstName:string,
    memberLastName:string
}