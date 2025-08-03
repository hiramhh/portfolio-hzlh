import { OrderProduct } from "./order-product";

export class Sale {
    $key!: string;
    orderId!: string;
    products!: OrderProduct[];
    date!: string;
    totalPrice!: number;
}
