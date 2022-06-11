import { configureStore } from '@reduxjs/toolkit';
import cardDataReducer from './reducers/cardData';

export const store = configureStore({
	reducer: {
		cardData: cardDataReducer,
	},
});
