import React from 'react'
import Badge from 'react-bootstrap/Badge';
import {Link, NavLink} from 'react-router-dom'
 const Commande = (props) => {
     var numCommande = 0;
    return (
        
            <div>
            {/* // <!-- Breadcrumb Start --> */}
            
            <div class="breadcrumb-wrap">
                <div class="container-fluid">
                    <ul class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Accueil</a></li>
                        <li class="breadcrumb-item active">Mes commandes</li>
                    </ul>
                   
                </div>
            </div>
    
            {/* // <!-- Breadcrumb End -->
            
            // <!-- Cart Start --> */}
    
            <div class="cart-page">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-8">
                            <div class="cart-page-inner">
                                <div class="table-responsive">
                               
                                    <table class="table table-bordered">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th>N°commande</th>
                                                <th>Date</th>
                                                <th>Net HT</th>
                                                <th>TTC</th>
                                                <th>Mode livraison</th>
                                                <th>Etat</th>
                                                <th>Annuler</th>
                                                
                                               
                                            </tr>
                                        </thead>
                                        <tbody class="align-middle">
                                        <tr>
                                            <td>{numCommande+1}</td>
                                            <td>{props.date}</td>
                                            <td>{props.prix}</td>
                                            <td>{props.total}</td>
                                            <td>$99</td>
                                            <td>  <Badge pill variant="warning">en attante</Badge>{' '}</td>
                                            <td><Link className="exit" ><i class="fas fa-times" ></i></Link></td>
                                        </tr>

                                       </tbody>
                                       
                    
                                        
                                        
                                        
                                    </table>
                                    
                                    
                                </div>
                            </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
    )
}
export default Commande;