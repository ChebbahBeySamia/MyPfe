import React from 'react'
import { useState , useEffect} from 'react'
import axios from "axios";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory} from 'react-router-dom'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));
  

export const Cart = (props) => {
    const history = useHistory();
  //snackbar
  const[snack, setSnack] = useState(false);
  const[snackCode, setSnackCode] = useState(false);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleClick  ()  {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  

  


 

    var x = 1;
    // t est un objet contient {ID:quantite}
    var t = props.panier.map((element, idx) => [element[0].ID,element[0].quantite])
    const [teste, setTeste] = useState(Object.fromEntries(t))
    const [pourcentagee, setPourcentagee] = useState(0);

    function incrementQuantite (e, ID) {
        setTeste({...teste,[ID]:teste[ID]+1}) //dans teste cherche ID et modifier sa quantite
        props.panier.map(el => {
            if (el[0].ID == ID) {
                el[0].quantite = teste[ID]+1
            }
        })
      
    }

    function decrementQuantite (e, ID) {
        setTeste({...teste,[ID]:teste[ID]-1})
        props.panier.map(el => {
            if (el[0].ID == ID) {
                el[0].quantite = teste[ID]-1
            }
        })
    }
   
    function test(e) {
        props.panier.map((produit, index) => {
        let tab = produit.map(el=>{
            const {quantite,ID} = produit
            return {...el,quantite,ID}
        })
        })
        
        
    }
    function deletePanier (e,p){
        
        props.setPanier(
                props.panier.filter((pr)=> pr[0] !== p)
        );
        
    }

   
   var prix = 0;
   var total = 0;

   //code Promo
   const [promo,setPromo] =useState([]);
   const [isLoading,setIsLoading] =useState(true);
   const [errors,setErrors] =useState(null);
   const [mode_paiement,setModePaiement] =useState("");
   //const [code, setCode] = useState("");
   var code = '';
   //fonction get tous les promos
   function getPromo() {
    axios
      .get("http://sitecommerce/api/getPromo?_format=json")
      .then(response =>
        response.data.map(promo => ({
          nom: `${promo.name}`,
          codee: `${promo.code}`,
          start_date: `${promo.start_date}`,
          end_date: `${promo.end_date}`,
          description:`${promo.description}`,
          pourcentage: `${promo.offer__target_plugin_configuration}`
           
        })
        )
      )
      .then(promos => {
        setPromo([...promos])
        setIsLoading(false)
       
      })
      .catch(error =>setErrors(error),
      setIsLoading(false)); 
        
  };

  useEffect(() => {
    getPromo();
 }, [])


   const handleChange = (e) => {
    // setCode({
    //   ...code,
    //   [e.target.name]: e.target.value.trim()
    // });
    code =  e.target.value.trim();
  
  };
  var pour = 0
  function handleSubmit (e) {
    e.preventDefault()
    console.log('code',code)
    var test = false

    promo.map((pr) => {
        
       const { nom, codee , start_date, end_date,description, pourcentage} = pr;
       if (code==codee){
           test=true
        var pourcentage1 = pourcentage.split(";")[4];
        var pourcentage2 = pourcentage1.split("&")[0];
        
        pour = parseFloat(pourcentage2,10)
        console.log('p',pour)
        console.log('promo',promo)
        setPourcentagee(pour)
        setSnackCode(false);
       }
    
    })
    if (test == false) {
        setPourcentagee(0)
     setSnackCode(true);

    }
    
    
    //console.log('pourcentage',pourcentagee)
  
  };

  //confirmation commande

 function Confirmation(e){
    props.setPrix(prix)
    props.setTotal(total)
    var d = new Date();
   var date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
   props.setDate(date)
   
     if (total<30){
        setSnack(true);
     }else{
        history.push('/commande')
        console.log('mode',mode_paiement)
     }
    
   
 };




    return (
        <div>
        {/* // <!-- Breadcrumb Start --> */}
        
        <div class="breadcrumb-wrap">
            <div class="container-fluid">
                <ul class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Accueil</a></li>
                    <li class="breadcrumb-item active">Panier</li>
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
                                            <th>Produits</th>
                                            <th>Prix</th>
                                            <th>Quantite</th>
                                            <th>Total</th>
                                            <th>Supprimer</th>
                                        </tr>
                                    </thead>
                                   
                
                                    <tbody class="align-middle">
                                    {(props.panier||[]).map((produit, index) => {
                const { title, categorie , description, image,TTC, ID} = produit;
                
                                    return(
                                        produit.map((p, index) => {
                                            var { title,  image,TTC , ID,quantite} = p; 
                                            
                                            var a = TTC.split("TND")[1];
                                           
                                            var A= parseFloat(a,10)
                                           
                                            prix  += A*teste[ID];

                                            return(
                                    
                                        <tr>
                                            <td>
                                                <div class="img">
                                                    <a href="#"><img src={image} alt="Image" /></a>
                                                    <p>{title}</p>
                                                </div>
                                            </td>
                                            <td>{TTC}</td>
                                            <td>
                                                <div class="qty">
                                                    <button class="btn-minus" onClick={(e) => decrementQuantite(e,ID)}><i class="fa fa-minus"></i></button>
                                                                
                                                        
                                                         <input type="text" value={teste[ID]} />
                                                    
                                                    <button class="btn-plus"  onClick={(e) => incrementQuantite(e,ID)}><i class="fa fa-plus"></i></button>
                                                </div>
                                            </td>
                                            <td>{A*teste[ID]} TND</td>
                                            <td><button onClick={(e) => deletePanier(e,p)}><i class="fa fa-trash" ></i></button></td>
                                            
                                        </tr>
                                            ); })
                                            
                                    );
                                        
                                    
                                    })
                                    }
                                    </tbody>
                                    
                                    
                                </table>
                                
                                
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="cart-page-inner">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="coupon">
                                        <input type="text" name="code" placeholder="Code promo" onChange={handleChange}></input>
                                        <button onClick={(e) => {handleSubmit(e);handleClick();}} >Appliquer Code</button>
                                        
                                   {snackCode &&
                                   <Alert severity="error">Code promo invalide</Alert>
                                }
                                        <div>
                 
 
            </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="cart-summary">
                                        <div class="cart-content">
                                            <h1> Panier </h1>
                                            <p>Sous-total<span>{prix} TND</span></p>
                                            <p>TVA<span>19%</span></p>
                                            <p>Remise<span>{pourcentagee}</span></p>
                                           <h2>Total<span>{total=(prix-prix*pourcentagee)+prix*19/100} TND</span></h2>
                                        
                                        </div>
                                        <div></div>
                                        <div>
                                        <Autocomplete
                                         id="combo-box-demo"
                                        options={paiement}
                                        getOptionLabel={(option) => option.title}
                                        style={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="Mode de paiement" variant="outlined" onChange={(e)=>setModePaiement(e.target.value)} name='mode_paiement'/>}
                                        
                                        />
                                      
                                        </div>
                                        <div class="cart-btn">
                                            {snack && 
                                            <Alert severity="warning">Un montant total minimum de 30,000 TNDs est requis pour valider votre commande.</Alert>
                                            }
                                        
                                            <button onClick={(e) =>{Confirmation(e); handleClick();}} variant="outlined"
                                            >Confirmer</button>
                                       
  
                                            <button >vérifier</button>
                                             
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Cart End --> */}
        </div>

        
    )
}
const paiement = [
    { title: 'Paiement à la livraison', year: 2021 },
    { title: 'Paiement en ligne', year: 2021 },
    
  ];
export default Cart;