import React from 'react'
import axios from "axios";
import { useState , useEffect} from 'react'
import { Component } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import {Link, NavLink} from 'react-router-dom';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import { PinDropSharp } from '@material-ui/icons';

//snackbar
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const AutoplaySlider = withAutoplay(AwesomeSlider);
const PAGE_PRODUCTS = 'products';
const PAGE_CART = 'cart';

function Product (props) {
  //les states
  const [produits,setProduits] =useState([]);
  const [isLoading,setIsLoading] =useState(true);
  const [errors,setErrors] =useState(null);
  const [cart,setCart]= useState([]);
  const [page, setPage]= useState(PAGE_PRODUCTS);
  const [state , setState] = useState(props.state)

  //fonction get produits from API
    function getProduits() {
        axios
          .get("http://sitecommerce/api/addproduit")
          .then(response =>
            response.data.map(produit => ({
              image: `http://sitecommerce`+`${produit.field_image}`,
              title: `${produit.title}`,
              categorie: `${produit.field_ca}`,
              description: `${produit.field_description}`,
              TTC:`${produit.field_ttc}`,
              ID: `${produit.product_id}`
               
            })
            )
          )
          .then(produits => {
            setProduits([...produits])
            setIsLoading(false)
           
          })
          .catch(error =>setErrors(error),
          setIsLoading(false));
            
      };
    
      
      useEffect(() => {
        getProduits();
     }, [])

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

     // action boutton ajouter au panier 
     function panier(id, e) {
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
            quantite: 1
          })
          )
        )
        .then(carts => {
              
              
              props.setPanier(carts)
              //setState([...cart,carts])
              
                
              })
            }
            

       // retourner interface produits      
      const renderProducts =() => (
        <div class="row align-items-center product-slider product-slider-4">
                
                {!isLoading ? (
                produits.map((produit, index) => {
                const { title, categorie , description, image,TTC, ID} = produit;
                
                return (
                 
                    <div className="col-lg-3">
                    
                        <div className="product-item">
                            <div className="product-title">
                                <a href="#">{title}</a>
                                
                                {/* <div className="ratting">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </div> */}
                            </div>
                            <div className="product-image">
                                <a href="product-detail.html">
                                    <img src={image} alt="Product Image" />
                                </a>
                                <div className="product-action">
                                    {/* <a href="#"><i className="fa fa-cart-plus"></i></a> */}
                                    <a href="#"><i className="fa fa-heart"></i></a>
                                    {/* <a href="#"><i className="fa fa-search"></i></a> */}
                                </div>
                            </div>
                            <div className="product-price">
                                
                                <h3><span></span>{TTC}</h3>
                                <Link className="btn" to="" onClick={(e) => {panier(ID, e) ;handleClick();}}  ><i className="fa fa-shopping-cart"></i>Ajouter au panier</Link>
                                
                              {/*snackBar */}
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
                    ) : (
                    <p>Loading...</p>
                    )}  
                {/* </div>
           </AwesomeSlider>  */}
           </div>
        
      );


        
      //retourner interface cart §§§§§§§§§
      const renderCart =() => (  
    
        cart.map((produit, index) => {
          const { title, categorie , description, image,TTC, ID} = produit;   
         
                   
          return(
            produit.map((p, index) => {
              const { title,  image,TTC} = p; 
              return(
        <div className="product-item">
 
        <div className="product-title">
            <a href="#">{p.title}</a>
        </div>
        <div className="product-image">
            <a href="product-detail.html">
                <img src={p.image} alt="Product Image" />
            </a>
            
        </div>
        <div className="product-price">
            
            <h3><span></span>{p.TTC}</h3>
            
        </div>
        </div>
              );
            })
          );
        })
   
    
          

   
      );



    //deplacer entre les interfaces  
   const navigateTo= (nextpage) =>{
    setPage(nextpage);
   };
  
   
      
    return (
      
        
        <div className="featured-product product">
        <div className="container-fluid">
            <div className="section-header">
                <h1>Nos produits</h1>
            </div>
            
            {/* {console.log('props', props.state) } */}
            {/* <button onClick={()=>navigateTo(PAGE_CART)}>cart ({cart.length})</button> */}
            {/* <button onClick={()=>navigateTo(PAGE_PRODUCTS)}>Produits </button> */}
        {page === PAGE_PRODUCTS && renderProducts()}
        {page === PAGE_CART && renderCart()}
       

        </div>
        </div>
    )
    
}
export default Product