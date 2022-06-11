import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import CardView from './CardView';
import { Provider } from 'react-redux';
import { store } from '../../../store';
import reducer, { addCard } from '../../../reducers/cardData';

afterEach(cleanup);

test('should take a snapshot', () => {
	const { asFragment } = render(
		<Provider store={store}>
			<CardView />
		</Provider>
	);
	expect(
		asFragment(
			<Provider store={store}>
				<CardView />
			</Provider>
		)
	).toMatchSnapshot();
});

test('should add a new card', () => {
	const arr = {
		cards: [
			{
				id: 1,
				tasks: [],
				title: 'Change Title',
			},
			{
				id: 2,
				tasks: [],
				title: 'Change Title',
			},
		],
	};
	render(
		<Provider store={store}>
			<CardView />
		</Provider>
	);
	fireEvent.click(screen.getByTestId('add-card'));
	const previousState = {
		cards: [
			{
				id: 1,
				tasks: [],
				title: 'Change Title',
			},
		],
	};
	expect(reducer(previousState, addCard({ id: 2 }))).toEqual(arr);
});
