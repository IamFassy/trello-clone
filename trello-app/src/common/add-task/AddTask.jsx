import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItemToTask } from '../../reducers/cardData';
import IconButton from '../icon-button/IconButton';
import './add-task.scss';

const AddTask = ({ id = '' }) => {
	const [taskName, setTaskName] = useState('');
	const dispatch = useDispatch();
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!taskName) {
			return;
		}
		dispatch(addItemToTask({ id: id, task: taskName }));
		setTaskName('');
	};
	const handleInput = (e) => {
		setTaskName(e.target.value);
	};
	return (
		<form className='add-task'>
			<div className='add-task__input-view'>
				<input
					placeholder='Add Task'
					value={taskName}
					onChange={handleInput}
					data-testid='task-name'
				/>
			</div>
			<div className='add-task__btn-view'>
				<IconButton onClick={handleSubmit} testId='add-task'>
					<FontAwesomeIcon icon='fa-solid fa-plus' />
				</IconButton>
			</div>
		</form>
	);
};

export default AddTask;
