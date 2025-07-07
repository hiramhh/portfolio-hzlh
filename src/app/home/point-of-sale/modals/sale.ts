import { OrderProduct } from "./order-product";

export class Sale {
    $key!: string;
    orderId!: number;
    products!: OrderProduct[];
    date!: string;
    totalPrice!: number;
}
