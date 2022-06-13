import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import AddTask from '../add-task/AddTask';
import {
	addItemToTask,
	deleteCard,
	updateTitle,
} from '../../reducers/cardData';
import './single-card.scss';
import TaskView from '../task-view/TaskView';

const SingleCard = ({ card = {}, totalLength = '' }) => {
	const [title, setTitle] = useState(card.title);
	const dispatch = useDispatch();

	const handleTitle = (e) => {
		setTitle(e.target.value);
		dispatch(updateTitle({ id: card.id, title: e.target.value }));
	};

	const handleDragOver = (e) => {
		if (e.dataTransfer.types[0] === 'text/plain') {
			e.preventDefault();
		}
	};
	const handleDelete = () => {
		dispatch(deleteCard({ id: card.id }));
	};

	const handleDrop = (e) => {
		const dataJSON = e.dataTransfer.getData('text/plain');
		let data;
		try {
			data = JSON.parse(dataJSON);
		} catch {}
		if (data && data.type === 'task' && data.id !== card.id) {
			dispatch(addItemToTask({ id: card.id, task: data.taskName }));
		}
	};
	return (
		<div
			className='single-card'
			onDragOver={handleDragOver}
			onDrop={handleDrop}
		>
			<input
				className='single-card__title-holder'
				value={title}
				onChange={handleTitle}
				data-testid='title-name'
			/>
			{card.tasks.map((task, index) => {
				return (
					<TaskView
						key={index}
						id={card.id}
						task={task}
						index={index}
					/>
				);
			})}
			<AddTask id={card.id} />
			<button
				className='single-card__delete-btn'
				disabled={totalLength < 2}
				onClick={handleDelete}
				data-testid='delete-card'
			>
				Delete
			</button>
		</div>
	);
};

export default SingleCard;
