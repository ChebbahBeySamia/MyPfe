import React from 'react'
import axios from "axios";
import { useState , useEffect} from 'react'
import { Component } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import {Link, NavLink} from 'react-router-dom';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import { PinDropSharp } from '@material-ui/icons';
import { useHistory} from 'react-router-dom'
//snackbar
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Menu from './Menu';

const PageProduits = (props) => {
  const history = useHistory();

console.log('props',props)

function panier(id, e) {
    var q = 1
    var test = true
    props.panier.map((paniers, index) => {
        if (paniers[0].ID == id) {
            paniers[0].quantite++
            test = false
        }

    })
    if (test==true) {
    axios
    .get("http://sitecommerce/api/getProduitByID/"+id+ "?_format=json")
    .then(response =>
      response.data.map(cart => ({
        image: `http://sitecommerce`+`${cart.field_image}`,
        title: `${cart.title}`,
        categorie: `${cart.field_ca}`,
        description: `${cart.field_description}`,
        TTC:`${cart.field_ttc}`,
        ID: `${cart.product_id}`,
        quantite: q
      })
      )
    )
    .then(carts => {
          
          
          props.setPanier(carts)
          //setState([...cart,carts])
          
            
          })
          history.push('/PageProduits')
        }
    }
          //snackbar
   const [open, setOpen] = React.useState(false);

   const handleClick = () => {
     setOpen(true);
   };
 
   const handleClose = (event, reason) => {
     if (reason === 'clickaway') {
       return;
     }
 
     setOpen(false);
   };

     //detail produit
     function getDetailProduit (ID,title,description,image,TTC,e){
         
        axios.get("http://sitecommerce/api/getProduitByID/"+ID+ "?_format=json")
        .then(response =>
          response.data.map(produit => ({
            image: `http://sitecommerce`+`${produit.field_image}`,
            title: `${produit.title}`,
           
            description: `${produit.field_description}`,
            TTC:`${produit.field_ttc}`,
            ID: `${produit.product_id}`
          })
          )
        )
        .then(produits => {
              
              
              props.setDetailProduit(produits)
              //setState([...cart,carts])
              
                
              })
 
     }

     //page favoris
     function favoris (id,e){
      axios
      .get("http://sitecommerce/api/getProduitByID/"+id+ "?_format=json")
      .then(response =>
        response.data.map(cart => ({
          image: `http://sitecommerce`+`${cart.field_image}`,
          title: `${cart.title}`,
          categorie: `${cart.field_ca}`,
          description: `${cart.field_description}`,
          TTC:`${cart.field_ttc}`,
          ID: `${cart.product_id}`
        })
        )
      )
      .then(carts => {
            
            
            props.setFavoris(carts)
            //setState([...cart,carts])
            
              
            })

          
     }
    
    return (
     
        <div className="featured-product product">
        <div className="container-fluid">

        <div className="row">
                    <div className="col-md-3">   
                               <Menu />
                    
                    </div>



                    <div className="col-md-6">

            <div className="section-header">
                <h1>Nos produits</h1>
            </div>
        <div class="row align-items-center product-slider product-slider-4">
                
        
        {props.produitCategorie.map((produitCategorie, index) => {
        const { title, categorie , description, image,TTC, ID} = produitCategorie;
        console.log('pro',produitCategorie);
        return (
         
            <div className="col-lg-6">
            
                <div className="product-item">
                    <Link to="/detailProduit">
                    <div className="product-title">
                        <a onClick={(e) => getDetailProduit(ID,title,description,image,TTC,e)}>{title}</a>
                    </div>
                    </Link>
                    <div className="product-image">
                        <a href="product-detail.html">
                            <img src={image} alt="Product Image" />
                        </a>
                        <div className="product-action">
                            {/* <a href="#"><i className="fa fa-cart-plus"></i></a> */}
                            <Link to="/favoris"><i className="fa fa-heart" onClick={(e) => favoris(ID, e)} ></i></Link>
                            {/* <a href="#"><i className="fa fa-search"></i></a> */}
                        </div>
                    </div>
                    <div className="product-price">
                        
                        <h3><span></span>{TTC}</h3>
                        <Link className="btn" to="" onClick={(e) => {panier(ID, e) ;handleClick();}}  ><i className="fa fa-shopping-cart"></i>Ajouter au panier</Link> 
                        
                      
                       <Snackbar
                        anchorOrigin={{
                         vertical: 'bottom',
                         horizontal: 'left',
                         }}
                         open={open}
                         autoHideDuration={6000}
                         onClose={handleClose}
                         message="produit ajouté au panier"
                        action={
                        <React.Fragment>
                         <Button color="secondary" size="small" onClick={handleClose}>
                            
                         </Button>
                          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                          <CloseIcon fontSize="small" />
                          </IconButton>
                        </React.Fragment>
                        }
                         />
                    </div>
                </div>
               
            </div>
            
            );
            })
            }  
        {/* </div>
   </AwesomeSlider>  */}
   </div>
   </div>


   </div>

   </div>
   </div>
  
    )
}
export default PageProduits;