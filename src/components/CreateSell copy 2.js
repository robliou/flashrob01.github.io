import React, {useState} from 'react';
//import {fetchingOffers, gotOffers, fetchingOffersFailed} from '../slice_reducers/offersSlice.js';
import './../styles/CreateSell.css';
//const axios = require('axios');
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import { gql, useQuery, useMutation } from '@apollo/client';
import Alert from 'react-bootstrap/Alert';


const CreateSell = () => {
const [industry, setIndustry] = useState('');
const [offer_type, setOffer_type] = useState('');
const [offer_details, setOffer_details] = useState('');
const [price, setPrice] = useState('');
const [headline, setHeadline] = useState('');
const [sell_offer_id, setSell_offer_id] = useState('');
const [qualifications, setQualifications] = useState('');

const [rate_type, setRate_type] = useState('');
const [target_audience, setTarget_audience] = useState('');


const [status, setStatus] = useState("");



//const [body, setBody] = useState('');

//const [values, handleChange] = UseForm({industry:"", offer_type:"", offer_details:"", price:"10", qualifications:"", user_id:"", buy_offer_id:""});
//const values = {industry, offer_type, offzer_details, price, qualifications, user_id, buy_offer_id};


let input;




   const ADD_SELL_OFFER = gql`
   mutation sell_offers($object: sell_offers_insert_input!) {
      insert_sell_offers_one(object:$object) {
        industry
        offer_type
        offer_details
        price
        qualifications
        headline
        sell_offer_id
        rate_type
        target_audience
      }
    }
    
`;

   const [value,setValue]=useState('');
const handleSelect=(e)=>{
  console.log(e);
  setValue(e)
}  


const [create_sell_offers, {data, loading, error}] = useMutation(ADD_SELL_OFFER, {
   variables: {
      object: {
         industry: industry,
         offer_type: offer_type,
         offer_details: offer_details,
         price: price,
         qualifications: qualifications,
         headline: headline,
         sell_offer_id: sell_offer_id,
         rate_type: rate_type,
         target_audience: target_audience

}}});

if (loading) return 'Submitting...';
if (error) {
   setStatus("error");

 return `Submission error! ${error.message}`;

}



    const handleSubmit = (e) => {
    e.preventDefault();
    create_sell_offers({industry, offer_type, offer_details, price, qualifications, headline, sell_offer_id, rate_type, target_audience});

   
   }
   
/*    addBuy({variables:{industry: input.value, offer_type: input.value, 
      offer_details: input.value, price: input.value, qualifications: input.value, 
      user_id: input.value, buy_offer_id:input.value }}) */

 

           return (
        <div class='flex-container'>
        
            <div class = 'pageContainer'>
           
           <h2 class='Headline'> 
            CREATE AN OFFER TO SELL
           </h2>         
           <br></br>
         <form onSubmit={handleSubmit}>
            <div className="formfield">In what industry are you looking for data or research?: <input type="string" id="industry" name="industry" maxLength="50" value={industry} onChange={(e) => setIndustry(e.target.value)} required/></div> <br/>
            
            {['end'].map((direction) => (
            <DropdownButton
      title="What type of product are you looking for?"
      id="dropdown-menu-align-right"
      onSelect={handleSelect}
      drop={direction}
      value={offer_type} onChange={(e) => setOffer_type(e.target.value)}
        >
              <Dropdown.Item eventKey="data">Dataset/ Report</Dropdown.Item>
              <Dropdown.Item eventKey="consulting- live discussion">One-on-One Consultation ( Phone/ videochat)</Dropdown.Item>
            
              <Dropdown.Divider />
              
      </DropdownButton>
            ))}
      <h4>{value}</h4>
            
            <div className="formfield">Please provide details of what you are seeking: <input class="string" name="offer_details" value={offer_details} onChange={(e) => setOffer_details(e.target.value)} /></div><br/>
            <div className="formfield">How much are you willing to pay for these products or services?: <input class="numeric" name='price' id="price" maxLength="20" value={price} onChange={(e) => setPrice(e.target.value)} /></div><br/>
            <div className="formfield">What are the qualifications you require of the seller? (Please include number of years of experience, work with specific companies, knowledge of specific fields or industries, level of education, certifications, achievments, etc.): <input class="string" name='qualifications' maxLength="250" id="qualifications" value={qualifications} onChange={(e) => setQualifications(e.target.value)} /></div><br/>
            <div className="formfield">Please write a brief headline for your proposal: <input class="string" name='headline' id="headline" maxLength="255" value={headline} onChange={(e) => setHeadline(e.target.value)} /></div><br/>
            <div className="formfield">What is your sell offer ID?: <input class="string" name='sell_offer_id' id="sell_offer_id" maxLength="255" value={sell_offer_id} onChange={(e) => setSell_offer_id(e.target.value)} /></div><br/>

            <div className="formfield">rate type: <input class="string" name='rate_type' id="rate_type" maxLength="255" value={rate_type} onChange={(e) => setRate_type(e.target.value)} /></div><br/>
            <div className="formfield">target audience: <input class="string" name='target_audience' id="target_audience" maxLength="255" value={target_audience} onChange={(e) => setTarget_audience(e.target.value)} /></div><br/>


            <button type="submit" id="submit" value="CreateSell" onSubmit={CreateSell}>Create Sell</button><br/>
            </form>
      
        </div>
               <div>
               {status === "error" ? (
                  <div>{console.log("An error occured")}</div>
                  
              ) : (
               <div>{console.log("Form submitted successfully")}</div>
              )}
               </div>
       
        </div>
        
           );
        }

    
    
        export default CreateSell;
