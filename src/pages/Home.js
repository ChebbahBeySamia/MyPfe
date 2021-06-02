
import React,{useEffect, useState} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'

//import Getproduit from "./components/Getproduit";

import Bottombar from '../layout/Bottombar'
import Mainslider from '../layout/Mainslider';
import Product from '../layout/Product';
import Call from '../layout/Call';
import Cart from '../layout/Cart/Cart';

import Service from '../layout/Service';
import Affiche from '../layout/Affiche';
import Panier from '../pages/Panier'

const Home=(props)=>{
  const {panier, setPanier,produitCategorie, setProduitCategorie} = props

  const [hello,setHello]=useState([]);


  // const logPanier  = (newPanier)=>{
      
  //     setPanier([...panier,newPanier])
  //     console.log('newpanier', panier)
  //   }

  const categorie = (newProduit)=>{
   
    console.log('new',newProduit,produitCategorie)
    setProduitCategorie([...newProduit])

   
  } 

 

  
      
      return (
       <div>
       
        <Mainslider setProduitCategorie={categorie} />
        <br/>
        <Affiche />
        <Call />
         {/* <Product setPanier={logPanier} /> */}
        <Service />
       </div>
      );
    }
  
  
  
  
  
  export default Home;
  