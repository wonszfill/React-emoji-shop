import styled from 'styled-components'
import { AppHeader } from './components/Header/Header';
import { ProductsView } from './components/ProductsView/ProductsView';

const AppWrapper = styled.div`
	min-height:100vh;
	display: grid;
	grid-template-rows: auto 1fr auto;
	justify-items: center;
`

function App() {
  return (
    <AppWrapper>
      	<AppHeader />
		<ProductsView />
		<footer>

		</footer>
    </AppWrapper>
  );
}

export default App;
