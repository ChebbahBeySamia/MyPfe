import React from 'react'
import { useState , useEffect} from 'react'
import axios from "axios";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useHistory} from 'react-router-dom'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));
 const Profil = () => {

  //api get user by id
  const history = useHistory();
  const [User,setUser] =useState([]);
  const [isLoading,setIsLoading] =useState(true);
  const [errors,setErrors] =useState(null);
  var id = parseInt(localStorage.getItem("id-client"));

   function getUserByID(id){
      axios
        .get("http://sitecommerce/api/getUserByID/"+id+"?_format=hal_json")
        .then(response =>
          response.data.map(user => ({
            nom: `${user.name}`,
            tel: `${user.field_numero_tel}`,
            id: `${user.uid}`
            
             
          })
          )
        )
        .then(users => {
          
          setUser([...users])
          setIsLoading(false)
         console.log('user',User);
        })
        .catch(error => setErrors(error),
        setIsLoading(false)
        );
     
    }

    useEffect(() => {
      getUserByID();
   }, [])



  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };




   
 

  return (
    <div className={classes.root}>
          {/* {User.map((user, index) => {
           
           const { nom, tel, id} = user;
           console.log('user',user);
          })} */}
    <Tabs
      orientation="vertical"
      variant="scrollable"
      value={value}
      onChange={handleChange}
      aria-label="Vertical tabs example"
      className={classes.tabs}
    >
      <Tab label="Details Profil" {...a11yProps(0)} />
      <Tab label="Mes commandes" {...a11yProps(1)} />
      <Tab label="Item Three" {...a11yProps(2)} />
      <Tab label="Item Four" {...a11yProps(3)} />
      <Tab label="Item Five" {...a11yProps(4)} />
      <Tab label="Item Six" {...a11yProps(5)} />
      <Tab label="Item Seven" {...a11yProps(6)} />
    </Tabs>

    <TabPanel value={value} index={0}>
    <h4>Details Profil</h4>
    
      
    <div class="row">
    
                
                                    <div class="col-md-6">
                                        <input class="form-control" type="text" value="{nom}"></input>
                                    </div>
                                    <div class="col-md-6">
                                        <input class="form-control" type="email" value="Email"></input>
                                    </div>
                                    <div class="col-md-6">
                                        <input class="form-control" type="Tel" value="{tel}"></input>
                                    </div>
                                  
                                    <div class="col-md-6">
                                        <input class="form-control" type="text" value="Address"></input>
                                    </div>
                                    
     
                                </div>
                          
                               
    </TabPanel>
      
    <TabPanel value={value} index={1}>
      Mes commandes
      <div class="table-responsive">
                                    <table class="table table-bordered">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th>No</th>
                                                <th>Product</th>
                                                <th>Date</th>
                                                <th>Price</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>Product Name</td>
                                                <td>01 Jan 2020</td>
                                                <td>$99</td>
                                                <td>Approved</td>
                                                <td><button class="btn">View</button></td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Product Name</td>
                                                <td>01 Jan 2020</td>
                                                <td>$99</td>
                                                <td>Approved</td>
                                                <td><button class="btn">View</button></td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>Product Name</td>
                                                <td>01 Jan 2020</td>
                                                <td>$99</td>
                                                <td>Approved</td>
                                                <td><button class="btn">View</button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
    </TabPanel>
    <TabPanel value={value} index={2}>
      Item Three
    </TabPanel>
    <TabPanel value={value} index={3}>
      Item Four
    </TabPanel>
    <TabPanel value={value} index={4}>
      Item Five
    </TabPanel>
    <TabPanel value={value} index={5}>
      Item Six
    </TabPanel>
    <TabPanel value={value} index={6}>
      Item Seven
    </TabPanel>
  </div>
);

}
export default Profil;