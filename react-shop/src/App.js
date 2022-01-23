import styled from 'styled-components'
import { AppHeader } from './components/Header/Header';

const AppWrapper = styled.div`
	min-height:100vh;
	display: grid;
	grid-template-rows: auto 1fr auto;
`

function App() {
  return (
    <AppWrapper>
      	<AppHeader />
		<body>

		</body>
		<footer>

		</footer>
    </AppWrapper>
  );
}

export default App;
