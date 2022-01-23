import { useEffect, useState } from "react";
import styled from "styled-components";
import { ProductCard } from "../ProductCard/ProductCard";

const ProductsWrapper = styled.div`
    width: 100%;
    max-width: 90rem;
`

export const ProductsView = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/products.json")
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [])

    console.log(products);

    return ( 
        <ProductsWrapper>
            { products.map(product => <ProductCard product={product} />) }
        </ProductsWrapper>
    );
}