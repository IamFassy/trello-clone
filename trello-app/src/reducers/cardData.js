import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	cards: [{ id: 1, tasks: [], title: 'Change Title' }],
};

export const cardData = createSlice({
	name: 'card',
	initialState,
	reducers: {
		addCard: (state, action) => {
			const id = action.payload.id;
			const obj = {
				id,
				tasks: [],
				title: 'Change Title',
			};
			const cards = state.cards;
			cards.push(obj);
			state.cards = cards;
		},
		addItemToTask: (state, action) => {
			const index = state.cards.findIndex(
				(card) => card.id === action.payload.id
			);
			const tasks = state.cards[index].tasks;
			tasks.push(action.payload.task);
			state.cards[index].tasks = tasks;
		},
		removeItemFromTask: (state, action) => {
			const index = state.cards.findIndex(
				(card) => card.id === action.payload.id
			);
			const taskIndex = action.payload.taskIndex;
			const tasks = state.cards[index].tasks;
			tasks.splice(taskIndex, 1);
			state.cards[index].tasks = tasks;
		},
		updateTitle: (state, action) => {
			const index = state.cards.findIndex(
				(card) => card.id === action.payload.id
			);
			const card = state.cards[index];
			card.title = action.payload.title;
			state.cards[index] = card;
		},
		deleteCard: (state, action) => {
			const index = state.cards.findIndex(
				(card) => card.id === action.payload.id
			);
			const cards = state.cards;
			cards.splice(index, 1);
			state.cards = cards;
		},
		updateItemInTask: (state, action) => {
			const index = state.cards.findIndex(
				(card) => card.id === action.payload.id
			);
			const taskIndex = action.payload.taskIndex;
			const tasks = state.cards[index].tasks;
			tasks[index] = action.payload.task;
			state.cards[index].tasks = tasks;
		},
	},
});

export const {
	addCard,
	addItemToTask,
	removeItemFromTask,
	updateTitle,
	deleteCard,
	updateItemInTask,
} = cardData.actions;

export default cardData.reducer;
