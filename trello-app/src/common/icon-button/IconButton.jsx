import React from 'react';
import './icon-button.scss';

const IconButton = ({ onClick, children, className = '', testId = '' }) => {
	return (
		<button
			data-testid={testId}
			className={`icon-button ${className}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default IconButton;