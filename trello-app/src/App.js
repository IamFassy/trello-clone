import './app.scss';
import CardHome from './components/card-home/CardHome';
import Header from './components/header/Header';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faPen, faXmark } from '@fortawesome/free-solid-svg-icons';

library.add(faPlus, faPen, faXmark);

function App() {
	return (
		<div className='app'>
			<Header />
			<CardHome />
		</div>
	);
}

export default App;
