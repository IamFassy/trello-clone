import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeItemFromTask, updateItemInTask } from '../../reducers/cardData';
import IconButton from '../icon-button/IconButton';
import './task-view.scss';

const TaskView = ({ task, index, id }) => {
	const dispatch = useDispatch();
	const [inputView, setInputView] = useState(false);
	const removeTask = () => {
		dispatch(removeItemFromTask({ id, taskIndex: index }));
	};

	const showInput = () => {
		setInputView((view) => !view);
	};

	const updateTask = (e) => {
		dispatch(
			updateItemInTask({ id, taskIndex: index, task: e.target.value })
		);
	};

	const dragStart = (e) => {
		const data = JSON.stringify({
			type: 'task',
			taskName: task,
			id,
		});
		e.dataTransfer.setData('text/plain', data);
	};

	const handleDragEnd = (e) => {
		e.dataTransfer.clearData();
	};

	return (
		<div
			className='task-view'
			draggable
			onDragStart={dragStart}
			onDragEnd={handleDragEnd}
		>
			<div className='task-view__left-view'>
				{!inputView ? (
					<p className='task-view__left-view-title'>{task}</p>
				) : (
					<input
						className='task-view__left-view-input'
						value={task}
						onChange={updateTask}
						data-testid='task-input'
						onBlur={showInput}
					/>
				)}
			</div>

			<IconButton onClick={showInput} testId='toggle-input'>
				<FontAwesomeIcon size={'xs'} icon='fa-solid fa-pen' />
			</IconButton>
			<IconButton onClick={removeTask} testId='remove-task'>
				<FontAwesomeIcon
					color={'red'}
					size={'xs'}
					icon='fa-solid fa-xmark'
				/>
			</IconButton>
		</div>
	);
};

export default TaskView;
