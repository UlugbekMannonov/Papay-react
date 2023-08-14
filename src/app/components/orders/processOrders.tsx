import { TabPanel } from '@mui/lab';
import { Box, Button, Stack } from '@mui/material';
import React from 'react';
import { format } from 'date-fns';

// REDUX
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { retrieveProcessOrders } from '../../screens/OrdersPage/selector';
import { Order } from '../../../types/order';
import { Product } from '../../../types/product';
import { serverApi } from '../../../lib/config';
import {
	sweetErrorHandling,
	sweetFailureProvider,
} from '../../../lib/sweetAlert';
import OrderApiService from '../../apiServices/orderApiService';
import { PausedOrders } from './pausedOrders';

/** REDUX SELECTOR **/
const processOrdersRetriever = createSelector(
	retrieveProcessOrders,
	(processOrders) => ({
		processOrders,
	})
);

const currentDate = new Date();
const time = format(currentDate, 'yyyy-MM-dd HH:mm:ss');

export function ProcessOrders(props: any) {
	/** INITIALIZATIONS **/
	const { processOrders } = useSelector(processOrdersRetriever);
	/** HANDLERS **/
	const finishOrderHandler = async (event: any) => {
		try {
			const order_id = event.target.value;
			const data = { order_id: order_id, order_status: 'FINISHED' };

			if (!localStorage.getItem('member_data')) {
				sweetFailureProvider('Please login first!', true);
			}

			let confirmation = window.confirm(
				'Buyurtmani olganingizni tasdiqlaysizmi?'
			);
			if (confirmation) {
				const orderService = new OrderApiService();
				await orderService.updateOrderStatus(data);
				//refresh builderlogic
				props.setOrderRebuild(new Date());
			}
		} catch (err) {
			console.log(`finishOrderHandler, ERROR: `, err);
			sweetErrorHandling(err).then();
		}
	};

	return (
		<TabPanel value="2">
			<Stack>
				{processOrders?.map((order: Order) => {
					return (
						<Box className="order_main_box">
							<Box className="order_box_scroll">
								{order.order_items.map((item) => {
									const product: Product = order.product_data.filter(
										(ele) => ele._id === item.product_id
									)[0];
									const image_path = `${serverApi}/${product.product_images[0]}`;
									return (
										<Box className="orderName_price">
											<img src={image_path} alt="" className="orderDishImg" />
											<p className="titleDish">{product.product_name}</p>
											<Box className="priceBox">
												<p>${item.item_price}</p>
												<img src={'/icons/close.svg'} alt="" />
												<p>{item.item_quantity}</p>
												<img src={'/icons/pause.svg'} alt="" />
												<p>${item.item_price * item.item_quantity}</p>
											</Box>
										</Box>
									);
								})}
							</Box>
							<Box
								className="total_price_box black_solid"
								style={{ background: '#8C66F2CF' }}
							>
								<Box className="boxTotal">
									<p>Mahsulot Narxi</p>
									<p>${order.order_total_amount - order.order_delivery_cost}</p>
									<img src={`/icons/plus.svg`} alt="" />
									<p>Yetkazish Xizmati</p>
									<p>${order.order_delivery_cost}</p>
									<img src={'/icons/pause.svg'} alt="" />
									<p>Jami Narx</p>
									<p>${order.order_total_amount}</p>
									<p>{time}</p>
									<Button
										value={order._id}
										onClick={finishOrderHandler}
										variant="contained"
										style={{ width: '126px', height: '36px', fontSize: '12px' }}
									>
										Yakunlash
									</Button>
								</Box>
							</Box>
						</Box>
					);
				})}
			</Stack>
		</TabPanel>
	);
}
function moment() {
	throw new Error('Function not implemented.');
}
