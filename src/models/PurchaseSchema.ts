export interface PurchaseSchemaInterface {
    id?: number;
    user: number;
    courses: number[];
    date : Date;
    total: number;
}

export class PurchaseSchema implements PurchaseSchemaInterface {
    id?: number;
    user: number;
    courses: number[];
    date: Date;
    total: number;
    constructor(purchase: any){
        this.id = purchase.id;
        this.user = purchase.user;
        this.courses = purchase.courses;
        this.date = purchase.date;
        this.total = purchase.total;
    }
}