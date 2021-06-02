import React from 'react'
import {Link, NavLink} from 'react-router-dom';

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
import { useState , useEffect} from 'react'
import axios from "axios";


 const Test = (props) => {
    const [categories,setCategories] =useState([]);
    const [isLoading,setIsLoading] =useState(true);
    
    const [errors,setErrors] =useState(null);
    const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
          maxWidth: 360,
          backgroundColor: theme.palette.background.paper,
        },
        nested: {
          paddingLeft: theme.spacing(4),
        },
      }));
       // fonction pour api get tous les categories
    function getCategories(){
        axios
          .get("http://sitecommerce/api/getCategorie?_format=json")
          .then(response =>
            response.data.map(categorie => ({
              label:`${categorie.field_label}`,
              logo: `http://sitecommerce`+`${categorie.field_logo_cat}`,
              parent: `${categorie.parent_target_id}`,
              ID: `${categorie.tid}`
               
            })
            )
          )
          .then(categories => {
            
            setCategories([...categories])
            console.log('categorie',categories)
            setIsLoading(false)
           
          })
          .catch(error => setErrors(error),
          setIsLoading(false)
          );
        //   .catch(error => this.setState({ error, isLoading: false }));
      }

       //fonction pour api get les produits par id categorie 
       function getProduitCategorie (id, e){
        console.log('id',id)
        axios
        .get("http://sitecommerce/api/getProduitCategorie/"+id+"?_format=json")
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
          console.log('produitt',produits)
        
          props.setProduitCategorie(produits)
          
          
         
          // setProduitCategorie([...produits])
          // console.log("produitcat",produitCategorie)
          setIsLoading(false)
         
        })
        .catch(error =>setErrors(error),
        setIsLoading(false));
      }
        



    useEffect(() => {
       getCategories();
    
       getProduitCategorie();
    }, [])


    const classes = useStyles();
    const [open, setOpen] = React.useState(Array(10).fill(false));
  
    const handleClick = (index) => {
      open[index] = !open[index]
      setOpen([...open]);
    };

    //filtrer les categories et sous categories
        let parents =  categories.filter(el=>!el.parent)
        let fils = categories.filter(el=>el.parent)
        let structuredCategory = parents.map(el=>{
                if(fils.map(elem=>elem.parent).includes(el.label))
                return {...el,fils : fils.filter(element=>element.parent === el.label)}
            }).filter(el=>el)



    return (
        <div>
                     <div className="row">
                    <div className="col-md-3">   
                                 {!isLoading ? (
                                     
                                    
                            //    categories.map((categorie, index) => {
                                //   const {  label , logo, parent} = categorie; 
                                
                                structuredCategory.map((categorie, index) => {
                                    const {  ID, label , fils, logo} = categorie;
                                   
                                     

                                 return (
                                  <List
                                  component="nav"
                                  
                                  
                                  className={classes.root}
                                >
                                  
                            
                                  <ListItem button onClick={()=>handleClick(index)}>
                                   
                                    <img src={logo} className="logoCat"/>
                                
                                    <ListItemText primary={label} />
                                    {open[index] ? <ExpandLess /> : <ExpandMore />}
                                  </ListItem>
                                  <Collapse in={open[index]} timeout="auto" unmountOnExit>
                                  {
                                           fils.map((filss,index)=>{
                                             const{label,ID}= filss;
                                             
                                             return (
                                              
                                    <List component="div" disablePadding >
                                      <Link to='/pageproduits'> 
                                      <ListItem button className={classes.nested} onClick={(e) => getProduitCategorie(ID,e)}>
                                        <ListItemIcon>
                                          <StarBorder />
                                        </ListItemIcon>
                                       
                                        <ListItemText >
                                         
                                                 {label}
                                        
                                        </ListItemText>
                                       
                                        </ListItem>
                                        </Link> 
                                   </List>
           );

          })
        }
        </Collapse>
      </List>
                                   
                                 );
                       
                                }
                                )
                                  ) : (
                                 <p>Loading...</p>
                                 )}
           
                    
                    </div>
                    </div>
            
        </div>
    )
}
export default Test;