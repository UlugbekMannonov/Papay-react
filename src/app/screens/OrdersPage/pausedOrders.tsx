import { TabPanel } from '@mui/lab';
import { Box, Button, Stack } from '@mui/material';
import React from 'react';

// REDUX
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { retrievePausedOrders } from './selector';

/** REDUX SELECTOR **/
const pausedOrdersRetriever = createSelector(
	retrievePausedOrders,
	(pausedOrders) => ({
		pausedOrders,
	})
);

const pausedOrders = [
	[1, 2, 3],
	[1, 2, 3],
	[1, 2, 3],
];

export function PausedOrders(props: any) {
	/** INITIALIZATIONS **/

	// const { pausedOrders } = useSelector(pausedOrdersRetriever);
	return (
		<TabPanel value="1">
			<Stack>
				{pausedOrders?.map((order) => {
					return (
						<Box className="order_main_box">
							<Box className="order_box_scroll">
								{order.map((item) => {
									const image_path = `/restaurant/steak.jpg`;
									return (
										<Box className="orderName_price">
											<img src={image_path} alt="" className="orderDishImg" />
											<p className="titleDish">Qovurilgan Go'sht </p>
											<Box className="priceBox">
												<p>$10</p>
												<img src={'/icons/close.svg'} alt="" />
												<p>2</p>
												<img src={'/icons/pause.svg'} alt="" />
												<p>$20</p>
											</Box>
										</Box>
									);
								})}
							</Box>
							<Box className="total_price_box black_solid">
								<Box className="boxTotal">
									<p>mahsulot narxi</p>
									<p>$60</p>
									<img src={`/icons/plus.svg`} alt="" />
									<p>yetkazish xizmati</p>
									<p>$5</p>
									<img src={'/icons/pause.svg'} alt="" />
									<p>Jami narx</p>
									<p>$65</p>
									<Button
										style={{
											width: '126px',
											height: '36px',
											fontSize: '12px',
											marginRight: '7px',
										}}
										variant="contained"
										color="secondary"
									>
										{' '}
										bekor qilish{' '}
									</Button>
									<Button
										variant="contained"
										style={{ width: '126px', height: '36px', fontSize: '12px' }}
									>
										{' '}
										To'lash{' '}
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
