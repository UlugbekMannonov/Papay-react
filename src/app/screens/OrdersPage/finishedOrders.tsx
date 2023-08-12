import TabPanel from '@mui/lab/TabPanel';
import { Box, Button, Stack } from '@mui/material';
import React from 'react';
// REDUX
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { retrieveFinishedOrders } from './selector';

/** REDUX SELECTOR **/
const finishedOrdersRetriever = createSelector(
	retrieveFinishedOrders,
	(finishedOrders) => ({
		finishedOrders,
	})
);

const pausedOrders = [
	[1, 2, 3],
	[1, 2, 3],
	[1, 2, 3],
];

export function FinishedOrders(props: any) {
	/** INITIALIZATIONS **/
	// const { finishedOrders } = useSelector(finishedOrdersRetriever);
	return (
		<TabPanel value="3">
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
											<p className="titleDish">Qovurilgan Go'sht</p>
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
							<Box
								className="total_price_box black_solid"
								style={{
									background: '#FF3434',
									display: 'flex',
									justifyContent: 'center',
								}}
							>
								<Box className="boxTotal">
									<p>mahsulot narxi</p>
									<p>$60</p>
									<img src={`/icons/plus.svg`} alt="" />
									<p>yetkazish xizmati</p>
									<p>$5</p>
									<img src={'/icons/pause.svg'} alt="" />
									<p>Jami narx</p>
									<p>$65</p>
								</Box>
							</Box>
						</Box>
					);
				})}
			</Stack>
		</TabPanel>
	);
}
