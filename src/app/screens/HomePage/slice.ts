import { createSlice } from '@reduxjs/toolkit';
import { HomePageState } from '../../../types/screen';

const initialState: HomePageState = {
	topRestaurants: [],
	bestRestaurants: [],
	trendProducts: [],
	bestBoArticles: [],
	trendBoArticles: [],
	newsBoArticles: [],
};

const HomePageSlice = createSlice({
	name: 'homePage',
	initialState,
	reducers: {
		setTopRestaurants: (state, action) => {
			state.topRestaurants = action.payload;
		},
		setBestRestaurants: (state, action) => {
			state.bestRestaurants = action.payload;
		},
		setTrendProducts: (state, action) => {
			state.trendProducts = action.payload;
		},
		setBestBoArticles: (state, action) => {
			state.bestBoArticles = action.payload;
		},
		setTrendBoArticles: (state, action) => {
			state.trendBoArticles = action.payload;
		},
		setNewsBoArticles: (state, action) => {
			state.newsBoArticles = action.payload;
		},
	},
});
// ishlatish
export const {
	setTopRestaurants,
	setBestRestaurants,
	setTrendProducts,
	setBestBoArticles,
	setTrendBoArticles,
	setNewsBoArticles,
} = HomePageSlice.actions;

//storega ulash
const HomePageReducer = HomePageSlice.reducer;
export default HomePageReducer;
