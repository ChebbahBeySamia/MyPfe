import React, {  useState, useEffect} from 'react';
import { useHistory} from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

 const Login = (props) => {
    
    const initialFormData={
        nom: "",
        prenom: "",
        mail: "",
        tel: 0,
        pass:"",
        
        
      };
const [count, setCount] = useState(initialFormData);
const [alertShow,setAlertShow] = useState(false);
const [alert,setAlert] = useState(false);
const [alertInscription,setAlertInscription] = useState(false);
const [user, setUser] = useState("");
const [password, setPassword] = useState("");

const [errors,setErrors] =useState(null);
const history = useHistory();
const [client, setClient] = useState([]);
const [idClient, setIdClient] = useState([]);



    //get user id
    function getUser() {
    axios
    .get("http://sitecommerce/api/getUser?_format=json")
    .then(response =>
      response.data.map(client => ({
        nom: `${client.name}`,
        id: `${client.uid}`
      
      })
      
      )
      
    )
    .then(clients => {
      setClient([...clients])
     
    })
    .catch(error =>setErrors(error),);
}
 

useEffect(() => {
    getUser();
 }, [])
 
 

const handleChange = (e) => {
    setCount({
      ...count,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(count);
    if(count.nom==='' || count.prenom ==='' ||count.mail==='' ||count.tel==='' || count.pass===''){
        setAlertInscription(true)
    }
    // ... submit to API or something
    axios({
    method: 'post',
    url: 'http://sitecommerce/user/register?_format=hal_json',
    data: {
        name:[{"value":count.nom+" "+count.prenom}],
      
        mail:[{"value":count.mail}],
        field_numero_tel:[{"value":count.tel}],
        pass:[{"value":count.pass}],
        //field_adresse:[{"value":[count.country, count.street, count.code_postal, count.city]}]
        //"field_adresse":[{"value":["7 rue alger","manar",5230,"tunisia"]}]
    }
    
  });
 
  };

  

  var x = 0;
  async function connecter(){
      
      let item = {name : user, pass : password};
     
      let result = await fetch("http://sitecommerce/user/login?_format=json", {
          method: 'POST',
          headers: {
              "Content-type": "application/json",
              "Accept": 'application/json'
          },
          body: JSON.stringify(item)
        });
        console.log('user', result.status)
      
        localStorage.setItem("user-info" , JSON.stringify(result))

        //console.log('local',localStorage.getItem("user-info"))
        if (user==='' || password===''){
            setAlert(true)
        }else{
        if (result.status === 200) {
           
           props.setProfil(user);
           for (var i = 0; i < client.length; i++) {
               if(client[i].nom === user){
          //console.log('api',client[i].nom,user)
          localStorage.setItem("id_client" , JSON.stringify(client[i].id));
          localStorage.setItem("nom_client" , JSON.stringify(user));
              
         
               }
           }
       
            x = 200;
            history.push("/")
        }else{
          
            x = 400;
            setAlert(false);
            setAlertShow(true)
         
        }
    }
  }



  const classes = useStyles();


    return (
        <div>
        <div class="breadcrumb-wrap">
            <div class="container-fluid">
                <ul class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Accueil</a></li>
                   
                    <li class="breadcrumb-item active">Connexion & Inscription</li>
                </ul>
            </div>
        </div>
        
        <div className="login">
            <div class="container-fluid">
                <div class="row">
         
                    <div class="col-lg-6">  
                    <h5 className='Auth'>Inscription</h5>  
                        <div class="register-form">
                        
                            <div class="row">
                               
                                <div class="col-md-6">
                                    <label>Prénom </label>
                                    <input class="form-control" type="text" placeholder="Prénom" name="prenom" onChange={handleChange}></input>
                                </div>
                                <div class="col-md-6">
                                    <label>Nom</label>
                                    <input class="form-control" type="text" placeholder="Nom" name="nom" onChange={handleChange}></input>
                                </div>
                                <div class="col-md-6">
                                    <label>E-mail</label>
                                    <input class="form-control" type="email" placeholder="E-mail" name="mail" onChange={handleChange}></input>
                                </div>
                                <div class="col-md-6">
                                    <label>Numéro Tél</label>
                                    <input class="form-control" type="tel" placeholder="Numéro Tél" name="tel" onChange={handleChange} ></input>
                                </div>
                                <div class="col-md-6">
                                    <label>Mot de passe</label>
                                    <input class="form-control" type="password" placeholder="Mot de passe"  name="pass" onChange={handleChange} ></input>
                                </div>
                                <div class="col-md-6">
                                    <label>Confirmer Mot de passe</label>
                                    <input class="form-control" type="text" placeholder="Mot de passe"></input>
                                </div>
                                {alertInscription && <div className={classes.root}>
                     <Alert severity="error">saisisez tous les champs</Alert>

                    </div>}
                                <div class="col-md-12">
                                    <button class="btn" onClick={handleSubmit}>Inscrire</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                         
                    <h5 className='Auth'>Connexion</h5>
                        <div class="login-form">
                            <div class="row">
                
                            {alertShow && <div className={classes.root}>
                     <Alert severity="error">Nom d'utilisateur ou mot de passe incorrect</Alert>

                    </div>}
                    
                                <div class="col-md-6">
                               
                                
                                    <label>Nom utilisateur</label>
                                    <input class="form-control" type="text" placeholder="Nom utilisateur" onChange={(e)=>setUser(e.target.value)} ></input>
                                </div>
                                <div class="col-md-6">
                                    <label>Mot de passe</label>
                                    <input class="form-control" type="password" placeholder="Mot de passe" onChange={(e)=>setPassword(e.target.value)} ></input>
                                </div>
                                <div class="col-md-12">
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="newaccount"></input>
                                        <label class="custom-control-label" for="newaccount">Rester connecté</label>
                                    </div>
                                </div>
                                {alert && <div className={classes.root}>
                     <Alert severity="error">saisisez nom utilisateur ou Mot de passe</Alert>

                    </div>}
                                <div class="col-md-12">
                                    <button class="btn" onClick={connecter}>Connecter</button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        
    )
}

export default Login;