import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import TaskView from './TaskView';
import { Provider } from 'react-redux';
import { store } from '../../store';
import reducer, {
	removeItemFromTask,
	updateItemInTask,
} from '../../reducers/cardData';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPen, faXmark } from '@fortawesome/free-solid-svg-icons';

library.add(faPen, faXmark);

afterEach(cleanup);

test('should take a snapshot', () => {
	const { asFragment } = render(
		<Provider store={store}>
			<TaskView task='Test' index={0} id={1} />
		</Provider>
	);
	expect(
		asFragment(
			<Provider store={store}>
				<TaskView task='Test' index={0} id={1} />
			</Provider>
		)
	).toMatchSnapshot();
});

test('remove item from task', () => {
	const previousState = {
		cards: [{ id: 1, tasks: ['First Item'], title: 'Change Title' }],
	};
	const arr = {
		cards: [{ id: 1, tasks: [], title: 'Change Title' }],
	};

	render(
		<Provider store={store}>
			<TaskView id={1} task='First Item' index={0} />
		</Provider>
	);
	fireEvent.click(screen.getByTestId('remove-task'));
	expect(
		reducer(previousState, removeItemFromTask({ id: 1, index: 0 }))
	).toEqual(arr);
});

test('show input view', () => {
	render(
		<Provider store={store}>
			<TaskView id={1} task='First Item' index={0} />
		</Provider>
	);
	fireEvent.click(screen.getByTestId('toggle-input'));
	expect(screen.getAllByTestId('task-input')).toBeTruthy();
});

const setup = () => {
	const utils = render(
		<Provider store={store}>
			<TaskView id={1} task='First Item' index={0} />
		</Provider>
	);
	const input = utils.getByTestId('task-input');
	return {
		input,
		...utils,
	};
};

test('update item in task', () => {
	const previousState = {
		cards: [{ id: 1, tasks: ['First Item'], title: 'Change Title' }],
	};
	const arr = {
		cards: [{ id: 1, tasks: ['Updated Item'], title: 'Change Title' }],
	};

	render(
		<Provider store={store}>
			<TaskView id={1} task='First Item' index={0} />
		</Provider>
	);
	fireEvent.click(screen.getByTestId('toggle-input'));
	const { input } = setup();
	fireEvent.change(input, { target: { value: 'Updated Item' } });
	expect(
		reducer(
			previousState,
			updateItemInTask({ id: 1, index: 0, task: 'Updated Item' })
		)
	).toEqual(arr);
});
