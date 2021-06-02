import React from 'react'
import Test from './Test'
import { useState , useEffect} from 'react'

 const Menu = (props) => {
    const {produitCategorie, setProduitCategorie} = props
    
    const categorie = (newProduit)=>{
        //console.log('props',props)
        
        setProduitCategorie([...newProduit])
    
       
      }
    return (
        <div>
            <Test setProduitCategorie={categorie} />
            
        </div>
    )
}
export default Menu;