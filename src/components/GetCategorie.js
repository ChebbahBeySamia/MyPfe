
import axios from "axios";
import { Component } from 'react';


// const options = {
//    method: 'GET',
//   url: 'http://sitecommerce/api/getCategorie?_format=json',
//    headers: {
//      'Access-Control-Allow-Origin': '*',
//      'X-Requested-With': 'XMLHttpRequest',
//      "Content-type": "Application/json", 
//     //  "Accept-Language": '*',
//     //  "Accept-Charset":'*',
     
//    },
//  };

 class GetCategorie extends Component{
  //  componentDidMount(){

    
  //   axios.request(options)
  //   .then(Response => {
     
  //     console.log(Response.data);
      
  //   }).catch(function (error) {
      
  //       console.error('error');
  //      });
    
  //    }

 
  state = {
    categories: [],
    isLoading: true,
    errors: null
  };

 getCategories() {
    axios
      .get("http://sitecommerce/api/getCategorie?_format=json")
      .then(response =>
        response.data.map(categorie => ({
          label:`${categorie.field_label}`,
          logo: `${categorie.field_logo_cat}`,
          
           
        })
        )
      )
      .then(categories => {
        this.setState({
          categories,
          isLoading: false
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.getCategories();
  } 

 

  render() {
    const { isLoading, categories } = this.state;
    return (
     <div>
<h2>Nos catégories</h2>
      <div>
        {!isLoading ? (
          categories.map((categorie, index) => {
            const {  label , logo} = categorie;
            
            return (
              <div key={index} >
                <p>catégorie: {label}</p>
                <img src={logo} />
                 
                
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
// render(){
//   return (
//     <div>
//       helloo
//     </div>
//   )
// }



}


export default GetCategorie;
