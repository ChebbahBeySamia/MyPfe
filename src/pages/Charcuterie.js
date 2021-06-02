import React from 'react'
import { useState , useEffect} from 'react'
import axios from "axios";

import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import {Link, NavLink} from 'react-router-dom';
import { useHistory} from 'react-router-dom'
import Menu from './Menu'


const Charcuterie = (props) => {

  
  const history = useHistory();
    const [platCharcuterie,setPlatCharcuterie] =useState([]);
    const [isLoading,setIsLoading] =useState(true);
    const [errors,setErrors] =useState(null);


     // fonction pour api get produit par categorie "plat charcuterie"
     function getProduitPlatCharcuterie(){
        axios
          .get("http://sitecommerce/api/getProduitCategorie/14?_format=json")
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
            
            setPlatCharcuterie([...produits])
            setIsLoading(false)
           
          })
          .catch(error => setErrors(error),
          setIsLoading(false)
          );
        //   .catch(error => this.setState({ error, isLoading: false }));
      }
  
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
  
      useEffect(() => {
         getProduitPlatCharcuterie();
      }, [])

    return (
        <div className="featured-product product">
        <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">   
                     <Menu />
          
          </div>
          <div className="col-lg-6">
            <div className="section-header">
                <h1>Nos charcuteries</h1>
            </div>
        <div class="row align-items-center product-slider product-slider-4">
                
        {!isLoading ? (
        platCharcuterie.map((platCharcuterie, index) => {
        const { title, categorie , description, image,TTC, ID} = platCharcuterie;
        
        return (
         
         
            <div className="col-lg-6">
            
                <div className="product-item">
                    <div className="product-title">
                        <a href="#">{title}</a>
                        
                       
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
                        <Link className="btn" to="" onClick={(e) => panier(ID, e) }  ><i className="fa fa-shopping-cart"></i>Ajouter au panier</Link> 
                        {/* <Link className="btn" to="" onClick={(e) => {panier(ID, e) ;handleClick();}}  ><i className="fa fa-shopping-cart"></i>Ajouter au panier</Link> */}
                        
                      {/*snackBar */}
                       {/* <Snackbar
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
                         /> */}
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
   </div>
   </div>
   </div>
   </div>
   
    )
}
export default Charcuterie;