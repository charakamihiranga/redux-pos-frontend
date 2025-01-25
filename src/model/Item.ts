export class items{
    id: string;
    name: string;
    qty: number;
    price: number;

    constructor(id: string, name: string, qty: number, price: number){
        this.id = id;
        this.name = name;
        this.qty = qty;
        this.price = price;
    }
}