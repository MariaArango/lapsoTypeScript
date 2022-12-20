export interface PurchaseInterface {
    id: number;
    user: number;
    courses: number[];
    date : Date;
    total: number;
}

export class Purchase implements PurchaseInterface {
    id: number;
    user: number;
    courses: number[];
    date: Date;
    total: number;
    constructor(purchase: any){
        this.id = purchase.idpurchase;
        this.user = purchase.user;
        this.courses = purchase.courses.split(',').map((course: string) => Number(course));
        this.date = purchase.date;
        this.total = purchase.total;
    }
}