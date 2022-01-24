import styled from 'styled-components'
import { AppHeader } from './components/Header/Header';
import { ProductsView } from './components/ProductsView/ProductsView';
import { OrderSummaryView } from './components/OrderSummaryView/OrderSummaryView';
import { createContext, useState } from 'react';
import {
	BrowserRouter,
	Routes,
	Route
  } from "react-router-dom";
import { PATHS } from './PATHS';

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
			<BrowserRouter>
			<CartContext.Provider value={cartContextObject}>
				<AppHeader />
				
					<Routes>
						<Route index path="/" element={<ProductsView />} />
						<Route index path={PATHS.summary} element={<OrderSummaryView />} />
					</Routes>
				
				<footer>

				</footer>
			</CartContext.Provider>
			</BrowserRouter>
		</AppWrapper>
  	);
}

export default App;
