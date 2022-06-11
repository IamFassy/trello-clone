import React from 'react';
import SingleCard from '../../../common/single-card/SingleCard';
import './card-view.scss';

const cardData = [{ id: 1, default: true, tasks: [], title: 'Change Title' }];

const CardView = () => {
	return (
		<div className='card-view'>
			{cardData.map((card) => {
				return <SingleCard key={card.id} card={card} />;
			})}
		</div>
	);
};

export default CardView;
