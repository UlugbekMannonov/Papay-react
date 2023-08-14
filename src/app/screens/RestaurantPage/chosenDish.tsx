import React, { useEffect, useState } from "react";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Box, Button, Container, Rating, Stack } from "@mui/material";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import CheckBox from "@mui/material/Checkbox";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Marginer from "../../components/marginer";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useParams } from "react-router-dom";
import { Product } from '../../../types/product';
import { Restaurant } from '../../../types/user';

// REDUX
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import {
	retrieveChosenProduct,
	retrieveChosenRestaurant,
} from '../../screens/RestaurantPage/selector';
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import {
	setChosenRestaurant,
	setChosenProduct
} from '../../screens/RestaurantPage/slice';
import ProductApiService from "../../apiServices/productApiService";
import RestaurantApiService from "../../apiServices/restaurantApiService";
import { Definer } from "../../../lib/Definer";
import assert from "assert";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import MemberApiService from "../../apiServices/memberApiService";
import { serverApi } from "../../../lib/config";



// REDUX SLICE
const actionDispatch = (dispach: Dispatch) => ({
	setChosenProduct: (data: Product) =>
		dispach(setChosenProduct(data)),
	setChosenRestaurant: (data: Restaurant) =>
		dispach(setChosenRestaurant(data)),
});

// REDUX SELECTOR
const chosenProductRetriever = createSelector(
	retrieveChosenProduct,
	(chosenProduct) => ({
		chosenProduct
	})
);

const chosenRestaurantRetriever = createSelector(
	retrieveChosenRestaurant,
	(chosenRestaurant) => ({
		chosenRestaurant,
	})
);


const chosen_list = Array.from(Array(3).keys());

export function ChosenDish(props: any) {
	// INITIALIZATIONS

	const { setChosenProduct, setChosenRestaurant } = actionDispatch(
		useDispatch()
	);
	const { chosenProduct } = useSelector(chosenProductRetriever);
	const { chosenRestaurant } = useSelector(chosenRestaurantRetriever);
	let { dish_id } = useParams<{ dish_id: string }>();
	const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
	const [productRebuild, setProductRebuild] = useState<Date>(new Date());

	const dishRelatedProcess = async () => {
		try {
			const productService = new ProductApiService();
			const product: Product = await productService.getChosenDish(dish_id);
			setChosenProduct(product);

			const restaurantService = new RestaurantApiService();
			const restaurant = await restaurantService.getChosenRestaurant(
				product.restaurant_mb_id
			);
			setChosenRestaurant(restaurant);
		} catch (err) {
			console.log('dishRelatedProcess, ERROR::', err);
		}
	};

	useEffect(() => {
		dishRelatedProcess().then();
	}, [productRebuild]);

	//** HANDLERS */
	const targetLikeProduct = async (e: any) => {
		try {
			assert.ok(localStorage.getItem('member_data'), Definer.auth_err1);

			const memberService = new MemberApiService(),
				like_result: any = await memberService.memberLikeTarget({
					like_ref_id: e.target.id,
					group_type: 'product',
				});
			assert.ok(like_result, Definer.general_err1);
			await sweetTopSmallSuccessAlert('success', 700, false);
			setProductRebuild(new Date());
		} catch (err: any) {
			console.log('targetLikeProduct, ERROR:', err);
			sweetErrorHandling(err).then();
		}
	};

	return (
		<div className="chosen_dish_page">
			<Container className="dish_container">
				<Stack className={'chosen_dish_slider'}>
					<Swiper
						loop={true}
						spaceBetween={10}
						navigation={true}
						modules={[FreeMode, Navigation, Thumbs]}
						className="dish_swiper"
					>
						{chosenProduct?.product_images.map((ele: string) => {
							const image_path = `${serverApi}/${ele}`;
							return (
								<SwiperSlide>
									<img
										src={image_path}
										style={{ width: '100%', height: '100%' }}
									/>
								</SwiperSlide>
							);
						})}
					</Swiper>
					<Swiper
						loop={true}
						spaceBetween={20}
						// slidesPerView={chosenProduct?.product_images.length}
						slidesPerView={3}
						freeMode={true}
						watchSlidesProgress={true}
						modules={[FreeMode, Navigation, Thumbs]}
						style={{ width: '450px', height: '245px', marginTop: '20px' }}
						className="mySwiper"
					>
						{chosenProduct?.product_images.map((ele: string) => {
							const image_path = `${serverApi}/${ele}`;
							return (
								<SwiperSlide
									style={{
										height: '107px',
										display: 'flex',
									}}
								>
									<img
										src={image_path}
										style={{
											borderRadius: '15px',
											width: '100%',
											height: '100%',
										}}
									/>
								</SwiperSlide>
							);
						})}
					</Swiper>
				</Stack>
				<Stack className={'chosen_dish_info_container'}>
					<Box className={'chosen_dish_info_box'}>
						<strong className={'dish_txt'}>
							{chosenProduct?.product_name}
						</strong>
						<span className={'resto_name'}>{chosenRestaurant?.mb_nick}</span>
						<Box className={'rating_box'}>
							<Rating name="half-rating" defaultValue={3.5} precision={0.5} />
							<div className="evaluation_box">
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										marginRight: '20px',
									}}
								>
									<CheckBox
										{...label}
										icon={<FavoriteBorder />}
										checkedIcon={<Favorite style={{ color: 'red' }} />}
										id={chosenProduct?._id}
										onClick={targetLikeProduct}
										checked={
											chosenProduct?.me_liked &&
											!!chosenProduct?.me_liked[0]?.my_favorite
										}
									/>

									<span>{chosenProduct?.product_likes} ta</span>
								</div>
								<div style={{ display: 'flex', alignItems: 'center' }}>
									<RemoveRedEyeIcon sx={{ mr: '10px' }} />
									<span>{chosenProduct?.product_views} ta</span>
								</div>
							</div>
						</Box>
						<p className={'dish_desc_info'}>
							{chosenProduct?.product_description
								? chosenProduct?.product_description
								: 'no description'}
						</p>
						<Marginer
							direction="horizontal"
							height="1"
							width="100%"
							bg="#000000"
						/>
						<div className={'dish_price_box'}>
							<span>Narx:</span>
							<span>${chosenProduct?.product_price}</span>
						</div>

						<div className={'button_box'}>
							<Button
								variant="contained"
								style={{
									width: '230px',
									height: '44px',
									borderRadius: '4px',
									fontSize: '15px',
								}}
								// variant="contained"
								onClick={() => {
									props.onAdd(chosenProduct);
								}}
							>
								Savatga qo'shish
							</Button>
						</div>
					</Box>
				</Stack>
			</Container>
		</div>
	);
}