export class items{
    id: number;
    name: string;
    qty: number;
    price: number;

    constructor(id: number, name: string, qty: number, price: number){
        this.id = id;
        this.name = name;
        this.qty = qty;
        this.price = price;
    }
}