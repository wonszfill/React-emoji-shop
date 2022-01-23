import styled from 'styled-components'
import { AppHeader } from './components/Header/Header';
import { ProductsView } from './components/ProductsView/ProductsView';
import { createContext, useState } from 'react';

export const CartContext = createContext({});

const AppWrapper = styled.div`
	min-height:100vh;
	display: grid;
	grid-template-rows: auto 1fr auto;
	justify-items: center;
`

function App() {

	const [cartContent, setCartContent] = useState([]);

	const cartContextObject = {
		cartContent: cartContent,
		setCartContent: setCartContent
	}

  	return (
		<AppWrapper>
			<CartContext.Provider value={cartContextObject}>
				<AppHeader />
				<ProductsView />
				<footer>

				</footer>
			</CartContext.Provider>
		</AppWrapper>
  	);
}

export default App;
