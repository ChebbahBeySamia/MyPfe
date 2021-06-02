
import axios from "axios";
import { Component } from 'react';


// const options = {
//    method: 'GET',
//   url: 'http://sitecommerce/api/addproduit',
//    headers: {
//      'Access-Control-Allow-Origin': '*',
//      'X-Requested-With': 'XMLHttpRequest',
//      "Content-type": "Application/json", 
     
//    },
//  };



 class Getproduit extends Component{
  // componentDidMount(){

    
  //   axios.request(options)
  //   .then(Response => {
     
  //     console.log(Response.data);
      
  //   }).catch(function (error) {
  //     console.log('Response.data');
  //       console.error('error');
  //      });
    
  //    }
  state = {
    produits: [],
    isLoading: true,
    errors: null
  };

 getProduits() {
    axios
      .get("http://sitecommerce/api/addproduit")
      .then(response =>
        response.data.map(produit => ({
          
          title: `${produit.title}`,
          categorie: `${produit.field_ca}`,
          description: `${produit.field_description}`,
           
        })
        )
      )
      .then(produits => {
        this.setState({
          produits,
          isLoading: false
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.getProduits();
  } 

 

  render() {
    const { isLoading, produits } = this.state;
    return (
     <div>
<h2>Nos produits</h2>
      <div>
        {!isLoading ? (
          produits.map((produit, index) => {
            const { title, categorie , description} = produit;
            return (
              <div key={index} >
                <p>title: {title}</p>
                 
                <p>catégorie: {categorie}</p>
                <p>description: {description}</p>
                <hr />
              </div>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
     </div>
    );
  }

// render() {

  
//   return (
      
//          <div>
//            test
            
//          </div>
     
//   );

// }


}


export default Getproduit;
