export interface IPayment{
    id:string,
    fineTotal:number,
    bookIssueMemberFirstName:string,
    bookIssueMemberLastName:string,
    bookIssueBookBookTitle:string,
    fineDate:Date;
    returnDate:string
}