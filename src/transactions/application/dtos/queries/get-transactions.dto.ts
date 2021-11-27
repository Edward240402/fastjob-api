export class GetTransactionsDto{
    public id: number;
    public contractId: number;
    public employeeId: number;
    public contractorId: number;
    public payment: number;
    public typeOfAccount: string;
    public discount: number;
    public total: number;
}