import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import AddTask from './AddTask';
import { Provider } from 'react-redux';
import { store } from '../../store';
import reducer, { addItemToTask } from '../../reducers/cardData';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

library.add(faPlus);

afterEach(cleanup);

test('should take a snapshot', () => {
	const { asFragment } = render(
		<Provider store={store}>
			<AddTask id={1} />
		</Provider>
	);
	expect(
		asFragment(
			<Provider store={store}>
				<AddTask />
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
			<AddTask id={1} />
		</Provider>
	);
	screen.getByTestId('task-name').innerText = 'First Item';
	fireEvent.click(screen.getByTestId('add-task'));
	expect(
		reducer(previousState, addItemToTask({ id: 1, task: 'First Item' }))
	).toEqual(arr);
});

const setup = () => {
	const utils = render(
		<Provider store={store}>
			<AddTask id={1} />
		</Provider>
	);
	const input = utils.getByTestId('task-name');
	return {
		input,
		...utils,
	};
};

test('input to update the task', () => {
	const { input } = setup();
	fireEvent.change(input, { target: { value: 'First Item' } });
	expect(input.value).toBe('First Item');
});
