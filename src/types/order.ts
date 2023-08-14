import { Product } from './product';

export interface OrderItem {
	_id: string;
	item_quantity: number;
	item_price: number;
	order_id: string;
	product_id: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface Order {
	map(arg0: (item: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
	_id: string;
	order_total_amount: number;
	order_delivery_cost: number;
	order_status: string;
	mb_id: string;
	createdAt: Date;
	updatedAt: Date;
	/** from aggregations */
	order_items: OrderItem[];
	product_data: Product[];
}
