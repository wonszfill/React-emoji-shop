import styled from "styled-components";

const Header = styled.header`
	padding: 2rem;
	display: grid;
    grid-template-columns: auto 1fr auto;
    font-size: 1.8rem;
    font-weight: 700;
    color: rgba(3,3,28,0.8);
    box-shadow: 1px 0 5px 1px rgba(0,0,0,0.2);
`

const HeaderLeft = styled.div`
    display: flex;
    justify-content: flex-start;
    align-content: center;
`

const HeaderCenter = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
`

const HeaderRight = styled.div`
    display: flex;
    justify-content: flex-end;
    align-content: center;
`

export const AppHeader = () => {
    return ( 
        <Header>
            <HeaderLeft>

            </HeaderLeft>
            <HeaderCenter>
                React Emoji Shop
            </HeaderCenter>
            <HeaderRight>

            </HeaderRight>
        </Header>
     );
}
