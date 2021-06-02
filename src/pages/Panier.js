import React,{useState} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import Cart from '../layout/Cart/Cart';


 const Panier = (props) => {
    return (
        <div>
            <Cart {...props}/>
        </div>
    );
}
export default Panier;