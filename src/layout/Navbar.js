import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import {Dropdown} from 'react-simple-dropdown'

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { LocalDiningOutlined } from '@material-ui/icons';
import { useHistory} from 'react-router-dom'
import Profil from '../pages/Profil';

 const Navbar = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  function handleClose ()  {
    setAnchorEl(null);
  };
  const history = useHistory();

  function Logout(){
    localStorage.clear();
    history.push('/')
  }

  function Profil(){
    history.push('/profil')
  }
   
    return (
        
        <div className="nav">
            <div className="container-fluid">
                <nav className="navbar navbar-expand-md bg-dark navbar-dark">
                    <a href="#" className="navbar-brand">MENU</a>
                    <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                        <div className="navbar-nav mr-auto">
                            <Link to="/" className="nav-item nav-link active">Accueil</Link>
                            <a href="product-list.html" className="nav-item nav-link">produits</a>
                            <a href="product-detail.html" className="nav-item nav-link">Product Detail</a>
                            {/* <a href="cart.html" className="nav-item nav-link">Cart</a>
                            <a href="checkout.html" className="nav-item nav-link">Checkout</a>
                            <a href="my-account.html" className="nav-item nav-link">My Account</a> */}
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Autres Pages</a>
                                <div className="dropdown-menu">
                                    <a href="wishlist.html" className="dropdown-item">Wishlist</a>
                                    <a href="login.html" className="dropdown-item">Login & Register</a>
                                    <a href="contact.html" className="dropdown-item">Contact Us</a>
                                </div>
                            </div>
                            <div>
      
      
        
     
    </div>
               
                        </div>
                        <div className="navbar-nav ml-auto">
                            <div className="nav-item dropdown">
                                {localStorage.getItem("nom_client")?
                               
                                 (
                                                         <div>
                                                         <Link to='' aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className="nav-item nav-link" >
                                                         {localStorage.getItem("nom_client").substr(1, localStorage.getItem("nom_client").length-2)}
                                                        
                                                         
                                                         </Link>
                                                         <Menu
                                                           id="simple-menu"
                                                           anchorEl={anchorEl}
                                                           keepMounted
                                                           open={Boolean(anchorEl)}
                                                           onClose={handleClose}
                                                         >
                                                           <MenuItem onClick={(e) =>{handleClose(); Profil();}}>Profile</MenuItem>
                                                           
                                                           <MenuItem onClick={(e) =>{handleClose(); Logout();}}>Déconnexion</MenuItem>
                                                         </Menu>
                                                       </div>
                                ):(
                                    <div>
                                    <Link to='/Login' className="nav-item nav-link" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                     Connexion
                                    </Link>
                                    
                                  </div>
                                )}
                                
                               
                            </div>
                        </div>

  

                    </div>
                </nav>
            </div>
        </div>
          
    )
}

export default Navbar