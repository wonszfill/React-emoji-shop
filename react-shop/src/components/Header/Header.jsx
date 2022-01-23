import styled from "styled-components";

const Header = styled.header`
	padding: 2rem 4rem;
    width: 100%;
    box-sizing: border-box;
	display: grid;
    grid-template-columns: 2fr 1fr 2fr;
    font-size: 1.8rem;
    font-weight: 700;
    color: rgba(3,3,28,0.8);
    box-shadow: 1px 0 5px 1px rgba(0,0,0,0.2);
    margin-bottom: 5rem;
    background: white;
`

const HeaderLeft = styled.div`
    display: flex;

    justify-content: flex-start;
    align-items: center;
`

const HeaderCenter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const HeaderRight = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`

const CartButton = styled.div`
    padding: 1rem 2rem;
    border-radius: 10rem;
    border: 2px solid green;
    background: lightgreen;
    position: relative;
    box-shadow: 2px 2px 5px 0px rgba(0,50,0,0.3);
    cursor: pointer;
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
                <CartButton>
                🛒 0
                </CartButton>
            
            </HeaderRight>
        </Header>
     );
}
