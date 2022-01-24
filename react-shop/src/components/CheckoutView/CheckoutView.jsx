import styled from "styled-components";

const StyledCheckout = styled.div`
    font-size: 3rem;
    text-align: center;
`

const BigLenny = styled.div`
    margin-top: 5rem;
    font-size:20rem; 
    /* ( ͡° ͜ʖ ͡°) */
`

export const CheckoutView = () => {

    

    return ( 
        <StyledCheckout>
            Serio? Naprawdę liczyłeś, że pozwolimy Ci kupić nasze emoji? Weź je po prostu skopiuj.
            <BigLenny>
                ( ͡° ͜ʖ ͡°)
            </BigLenny>
        </StyledCheckout>
        
    );
}
