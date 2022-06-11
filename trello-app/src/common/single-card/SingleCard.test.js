import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import SingleCard from './SingleCard';
import CardView from '../../components/card-home/card-view/CardView';
import { Provider } from 'react-redux';
import { store } from '../../store';
import reducer, { addItemToTask, deleteCard } from '../../reducers/cardData';

afterEach(cleanup);

test('should take a snapshot', () => {
	const card = {
		id: 1,
		tasks: [],
		title: 'Change Title',
	};
	const { asFragment } = render(
		<Provider store={store}>
			<SingleCard card={card} />
		</Provider>
	);
	expect(
		asFragment(
			<Provider store={store}>
				<SingleCard card={card} />
			</Provider>
		)
	).toMatchSnapshot();
});

test('add new item to task', () => {
	const previousState = {
		cards: [{ id: 1, tasks: [], title: 'Change Title' }],
	};
	const arr = {
		cards: [{ id: 1, tasks: ['First Item'], title: 'Change Title' }],
	};

	render(
		<Provider store={store}>
			<SingleCard card={previousState.cards[0]} />
		</Provider>
	);
	screen.getByTestId('task-name').innerText = 'First Item';
	fireEvent.click(screen.getByTestId('add-task'));
	expect(
		reducer(previousState, addItemToTask({ id: 1, task: 'First Item' }))
	).toEqual(arr);
});

const setup = () => {
	const previousState = {
		cards: [{ id: 1, tasks: [], title: 'Change Title' }],
	};
	const utils = render(
		<Provider store={store}>
			<SingleCard card={previousState.cards[0]} />
		</Provider>
	);
	const input = utils.getByTestId('title-name');
	return {
		input,
		...utils,
	};
};

test('input to update the title', () => {
	const { input } = setup();
	fireEvent.change(input, { target: { value: 'Grocery' } });
	expect(input.value).toBe('Grocery');
});

test('delete a card', () => {
	const previousState = {
		cards: [
			{ id: 1, tasks: [], title: 'Change Title' },
			{ id: 2, tasks: [], title: 'Change Title' },
		],
	};
	const arr = {
		cards: [{ id: 1, tasks: [], title: 'Change Title' }],
	};

	render(
		<Provider store={store}>
			<SingleCard card={previousState.cards[1]} />
		</Provider>
	);
	fireEvent.click(screen.getByTestId('delete-card'));
	expect(reducer(previousState, deleteCard({ id: 2 }))).toEqual(arr);
});
