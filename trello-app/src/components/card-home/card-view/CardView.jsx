import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '../../../common/icon-button/IconButton';
import SingleCard from '../../../common/single-card/SingleCard';
import { addCard } from '../../../reducers/cardData';
import './card-view.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faPen, faXmark } from '@fortawesome/free-solid-svg-icons';

library.add(faPlus, faPen, faXmark);

const CardView = () => {
	const cards = useSelector((state) => state.cardData.cards);
	const dispatch = useDispatch();
	const handleAddCard = () => {
		dispatch(addCard({ id: cards.length + 1 }));
	};

	return (
		<div className='card-view'>
			{cards.map((card) => {
				return (
					<SingleCard
						key={card.id}
						card={card}
						totalLength={cards.length}
					/>
				);
			})}
			<IconButton
				className='card-view__add-card'
				onClick={handleAddCard}
				testId={'add-card'}
			>
				<FontAwesomeIcon icon='fa-solid fa-plus' />
			</IconButton>
		</div>
	);
};

export default CardView;
