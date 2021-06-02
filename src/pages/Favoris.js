import React from 'react'


const Favoris = (props) => {
    
   return(
    <div class="wishlist-page">
    <div class="container-fluid">
        <div class="wishlist-page-inner">
            <div class="row">
                <div class="col-md-12">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead class="thead-dark">
                                <tr>
                                    <th>Produit</th>
                                    <th>Prix</th>
                                    <th>Ajouter au panier</th>
                                    <th>Supprimer</th>
                                </tr>
                            </thead>
                            <tbody class="align-middle">
                            {props.favoris.map((produit, index) => {
        const { title, categorie , description, image,TTC, ID} = produit;
        console.log('fav',title);
                                <tr>
                                    <td>
                                        <div class="img">
                                            <a href="#"><img src={image} alt="Image" /></a>
                                            <p>{title}</p>
                                        </div>
                                    </td>
                                    <td>{TTC}</td>
                               
                                    <td><button class="btn-cart">Add to Cart</button></td>
                                    <td><button><i class="fa fa-trash"></i></button></td>
                                </tr>
                            }
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
   );
}
export default Favoris;