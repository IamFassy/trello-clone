import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './single-card.scss';

const SingleCard = ({ card = {} }) => {
	return (
		<div className='single-card'>
			<input className='single-card__title-holder' value={card.title} />
			<div className='single-card__add-task'>
				<input
					className='single-card__add-task-input'
					placeholder='Add Task'
				/>
				<FontAwesomeIcon icon='fa-solid fa-plus' />
			</div>
		</div>
	);
};

export default SingleCard;
