import React, {  useState } from 'react';

import axios from "axios";

// axios({
//     method: 'post',
//     url: 'http://sitecommerce/user/register?_format=hal_json',
//     data: {
//         name:[{"value":"semira"}],
//       
//         mail:[{"value":"semira@gmail.com"}],
//         field_numero_tel:[{"value":"12345678"}],
//         field_adresse:[{"value":"12345678"}]
//     }
//   });



function PostClient() {
    const initialFormData={
        name: "",
        mail: "",
        tel: 0,
        // adresse:"",
        //     // country : "",
        //     // street : "",
        //     // code_postal :0,
        //     // city: "",

        
      };
const [count, setCount] = useState(initialFormData);

 
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
    // ... submit to API or something
    axios({
    method: 'post',
    url: 'http://sitecommerce/user/register?_format=hal_json',
    data: {
        name:[{"value":count.name}],
      
        mail:[{"value":count.mail}],
        field_numero_tel:[{"value":count.tel}],
        //field_adresse:[{"value":[count.country, count.street, count.code_postal, count.city]}]
        //"field_adresse":[{"value":["7 rue alger","manar",5230,"tunisia"]}]
    }
    
  });
 
  };

  return (
    <>
      <label>
        Username
        <input name="name" onChange={handleChange} />
      </label>
      <br />
      <label>
        Mail
        <input type='email' name="mail" onChange={handleChange} />
      </label>
      <br />
      <label>
        Tel
        <input type='tel' name="tel" onChange={handleChange} />
      </label>
      <br />
      {/* <label>
        adresse
        <input  name="adresse" onChange={handleChange} />
      </label> */}
      {/* <fieldset name="adresse">
      <legend>adresse</legend>
        <label> country
        <input name="country" onChange={handleChange} />
        </label>
        <br />
        <label> street
        <input name="street" onChange={handleChange} />
        </label>
        <br />
        <label> code_postal
        <input name="code_postal" onChange={handleChange} />
        </label>
        <br />
        <label> city
        <input name="city" onChange={handleChange} />
        </label>
      </fieldset> */}
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};
  export default PostClient;