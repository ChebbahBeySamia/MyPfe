import React from 'react'
import {Link, NavLink} from 'react-router-dom'

import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';


const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

const Bottombar = (props) => {
    return (
        <div>
            <div class="bottom-bar">
            <div class="container-fluid">
                <div class="row align-items-center">
                    <div class="col-md-3">
                        <div class="logo">
                            <Link to='/' >
                                <img src="img/logo.png" alt="Logo" />
                            </Link>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="search">
                            <input type="text" placeholder="Search"></input>
                            <button><i class="fa fa-search"></i></button>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="user">
                            <StyledBadge badgeContent={2} color="secondary">
                            <Link to="/favoris" class="btn wishlist">
                            <i class="fa fa-heart"></i>
                            </Link>
                            </StyledBadge>

                            <StyledBadge badgeContent={props.panier} color="secondary" className = "span2">
                            <Link to="/cart" class="btn cart">
                                <i class="fa fa-shopping-cart"></i>
                                 {/* <span>({props.panier})</span>  */}
                            </Link>
                            </StyledBadge>
                            
    
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Bottombar