import React, {useState, useEffect} from 'react';
//import {fetchingOffers, gotOffers, fetchingOffersFailed} from '../slice_reducers/offersSlice.js';
import './../styles/CreateSell.css';
//const axios = require('axios');
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import { gql, useQuery, useMutation } from '@apollo/client';
import Alert from 'react-bootstrap/Alert';
import { useAuth0 } from "@auth0/auth0-react";


const InputForm = () => {
const [industry, setIndustry] = useState('');
const [offer_type, setOffer_type] = useState('');
const [offer_details, setOffer_details] = useState('');
const [price, setPrice] = useState('');
const [headline, setHeadline] = useState('');
const [qualifications, setQualifications] = useState('');
const [rate_type, setRate_type] = useState('');
const [target_audience, setTarget_audience] = useState('');
const [region, setRegion] = useState('');
const [languages, setLanguage] = useState('');
const [sent_message, setSent_message] = useState('');

/* const [user_id, setUser_id] = useState('');
 */

const { user} = useAuth0();

const user_id =user.sub;


const [status, setStatus] = useState("");



//const [body, setBody] = useState('');

//const [values, handleChange] = UseForm({industry:"", offer_type:"", offer_details:"", price:"10", qualifications:"", user_id:"", buy_offer_id:""});
//const values = {industry, offer_type, offzer_details, price, qualifications, user_id, buy_offer_id};


let input;

const ADD_MESSAGE = gql`
mutation messages($object: messages_insert_input!) {
    insert_messages_one(object: $object) {
      sent_message
      user_id
    }
  }
`;

   


const [create_messages, {data, loading, error}] = useMutation(ADD_MESSAGE, {
   variables: {
      object: {
         sent_message: sent_message,
         user_id: user_id,

    
        
}}});

if (loading) return 'Submitting...';
if (error) {
   setStatus("error");

 return `Submission error! ${error.message}`;

}



    const handleSubmit = (e) => {
    e.preventDefault();
    create_messages({sent_message, user_id});
 
   }



           return (
            
            <div class="container-Sell">
               <h2 class='Headline'> 
               Send the seller a message 
           </h2>         
           <br></br>
           <form onSubmit={handleSubmit}>   
              <ul class="flex-outer">
                
                
                <li>
                  <label for="message">Write your message here:</label>
                  <textarea rows="6"  placeholder="Enter your message here" input class="string" name="sent_message" value={sent_message} onChange={(e) => setSent_message(e.target.value)} required></textarea>
                </li>  
                 
               
              
                <li>
                  <button type="submit">Submit</button>
                </li>
              </ul>
            </form>
          </div>
        
           );
        }

    
    
        export default InputForm;
