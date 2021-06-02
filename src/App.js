import './App.css';
import React,{useState} from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom'

//import Getproduit from "./components/Getproduit";
import PostClient  from "./components/PostClient";
import GetCategorie from "./components/GetCategorie"
import Getproduit from './components/Getproduit';
import GetProduitCategorie from './components/GetProduitCategorie';
import Navbar from './layout/Navbar';
import Topbar from './layout/Topbar';
import Bottombar from './layout/Bottombar'
import Mainslider from './layout/Mainslider';
import Product from './layout/Product';
import Footer from './layout/Footer';

import Cart from './layout/Cart/Cart';
import NestedList from './components/NestedList';
import Service from './layout/Service';
import ControlledAccordions from './components/ControlledAccordions'
import Home from './pages/Home';
import Panier from './pages/Panier'
import Charcuterie from './pages/Charcuterie';
import PageProduit from './pages/PageProduits'
import Login from './pages/Login'
import DetailProduit from './pages/DetailProduit'
import Commande from './pages/Commande'
import Favoris from './pages/Favoris';
import Profil from './pages/Profil';
import Menu from './pages/Menu';



 const App=()=>{
  
  const [panier,setPanier] =useState([])
  const [produitCategorie,setProduitCategorie] =useState([]);
  const [detailProduit,setDetailProduit]=useState([]);
  //detail commande
  const [total,setTotal]=useState([]);
  const [prix, setPrix]=useState([]);
  const [date, setDate]=useState([]);
 //User
 const [ok, setOK]=useState(false);
 const [profil, setProfil]=useState("");

//Liste favoris
const [favoris, setFavoris]=useState([]);

  const logPanier  = (newPanier)=>{
      
    setPanier([...panier,newPanier])
    console.log('newpanier', panier)
  }

  console.log('prod',produitCategorie)

    
    return (
     <div>
 
      <BrowserRouter>
        <Topbar />
        <Navbar ok={ok} profil={profil}/>
        <Bottombar panier={panier.length}/>
       
          <Switch>
          
           <Route path='/Menu'><Menu setProduitCategorie={setProduitCategorie} produitCategorie={produitCategorie}/></Route>
            <Route path='/cart'><Panier panier={panier} setPanier={setPanier}  setTotal={setTotal} setPrix={setPrix} setDate={setDate}/></Route>
            <Route exact path='/' ><Home panier={panier} setPanier={setPanier} produitCategorie={produitCategorie} setProduitCategorie={setProduitCategorie}/></Route>
            <Route path='/charcuterie'><Charcuterie panier={panier} setPanier={logPanier}/></Route>
            <Route path='/pageproduits'><PageProduit  l={panier.length} panier={panier} setPanier={logPanier} produitCategorie={produitCategorie} detailProduit={detailProduit} setDetailProduit={setDetailProduit} setFavoris={setFavoris}/></Route>
            <Route path='/login'><Login  setOK={setOK} setProfil={setProfil} /></Route>
            <Route path='/detailproduit'><DetailProduit detailProduit={detailProduit}/></Route>
            <Route path='/commande'><Commande total={total} prix={prix} date={date}/></Route>
            <Route path='/favoris'><Favoris favoris={favoris}/></Route>
            <Route path='/profil'><Profil /></Route>
          </Switch>
        <Footer />
     
      </BrowserRouter>
   
      
     
     </div>
    );
  }





export default App;
