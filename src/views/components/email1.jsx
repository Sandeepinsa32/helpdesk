import React, {useState} from 'react';
import {Grid, Button, Box, Paper} from '@mui/material';
// @mat_icon
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import {BASEURL, successToast} from '../../utils/Utils';

const Email1 = ({selectedEmailTemplate, Tabledata, pnrData, recordData, Ticketid}) => {
	console.log(selectedEmailTemplate, Tabledata, pnrData, recordData);
	const [isPreviewed, setIsPreviewed] = useState(true);
	const grandTotal = '100';
	function renderingEmail() {
		switch (selectedEmailTemplate) {
			case 'newBooking':
				return <span dangerouslySetInnerHTML={{__html: newBooking}} />;
			case 'exchange':
				return <span dangerouslySetInnerHTML={{__html: Exchange}} />;
			case 'refund':
				return <span dangerouslySetInnerHTML={{__html: Refund}} />;
			case 'futureCredit':
				return <span dangerouslySetInnerHTML={{__html: futureCredit}} />;

				return <span dangerouslySetInnerHTML={{__html: newBooking}} />;
		}
	}
	function getSelectedEmail() {
		switch (selectedEmailTemplate) {
			case 'newBooking':
				return newBooking;
			case 'exchange':
				return Exchange;
			case 'refund':
				return Refund;
			case 'futureCredit':
				return futureCredit;
			default:
				return newBooking;
		}
	}

	function currentDate() {
		let today = new Date();
		let dd = String(today.getDate()).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		let yyyy = today.getFullYear();

		today = mm + '/' + dd + '/' + yyyy;
		return today;
	}

	function userTabelData1() {
		var tableString = '';
		Tabledata.forEach((x) => {
			const isEmpty = Object.values(x).every((obj) => obj === null || obj === '');
			console.log(isEmpty);
			if (isEmpty) {
				return;
			}

			tableString =
				tableString +
				`<tr>
		  <td >${x.firstName}</td>
		  <td>${x.middleName}</td>
		  <td>${x.lastName}</td>
		  <td>${x.ticket}</td>
		  <td>${x.confirmation}</td>
		  <td>${x.price}</td>
		</tr>`;
		});

		return tableString;
	}
	function userTabelData2() {
		// console.log(Tabledata);
		var tableString = '';
		Tabledata.forEach((x) => {
			const isEmpty = Object.values(x).every((obj) => obj === null || obj === '');
			console.log(isEmpty);
			if (isEmpty) {
				return;
			}
			tableString =
				tableString +
				`<tr>
		  <td >${x.firstName}</td>
		  <td>${x.middleName}</td>
		  <td>${x.lastName}</td>
		  <td>${x.ticket}</td>
		  <td>${x.price}</td>
		</tr>`;
		});

		return tableString;
	}
	function userTabelData3() {
		// console.log(Tabledata);
		var tableString = '';
		Tabledata.forEach((x) => {
			const isEmpty = Object.values(x).every((obj) => obj === null || obj === '');
			console.log(isEmpty);
			if (isEmpty) {
				return;
			}
			tableString =
				tableString +
				`<tr>
		  <td class="tableHeading" scope="col" name="firstname">${x.firstName}</td>
		  <td class="tableHeading" scope="col" name="middlename">${x.middleName}</td>
		  <td class="tableHeading" scope="col" name="lastname">${x.lastName}</td>
		  <td class="tableHeading" scope="col" name="refund">${x.refund}</td>
		</tr>`;
		});

		return tableString;
	}
	function userTabelData4() {
		// console.log(Tabledata);
		var tableString = '';
		Tabledata.forEach((x) => {
			const isEmpty = Object.values(x).every((obj) => obj === null || obj === '');
			console.log(isEmpty);
			if (isEmpty) {
				return;
			}
			// console.log(x);
			tableString =
				tableString +
				`<tr>
		  <td >${x.firstName}</td>
		  <td>${x.middleName}</td>
		  <td>${x.lastName}</td>
		  <td>${x.confirmation}</td>
		</tr>`;
		});

		return tableString;
	}
	var newBooking = `
<div style="background:#ffffff; padding:10px;font-weight:500; text-align:left;  font-family:Calibri, sans-serif;">
		
      <p style="font-size:13px; line-height:16px; color:#0B4173; margin:0px;border-radius:3px;padding:10px 5px;  font-family:Calibri, sans-serif;">
        By approving via email you are agreeing to the terms of invoice and authorize Trip Help Desk powered by Valalto to complete your "Requested Service".  Your authorization is for the use of this invoice and for no other purpose. 
      </p>
      
	  	<hr style="margin:2px;height: 2px;background: #051A2E;border-radius: 10px;"/>
		  <h1 style="font-size:14px; text-align:right; line-height:22px; font-weight:normal; color:#0B4173;font-family:sans-serif;">
			  Trip Help Desk Powered By <b style="color: #0B4173;font-size: 16px;">Valalto Inc.</b>	
        </h1>
          
			<div style="display:flex;justify-content:space-between;">
		
        <div style="width:50%">
            <span style="color: #0B4173;font-size: 16px; line-height:22px; font-weight:bold; margin:0;height:fit-content;font-family: sans-serif; "> New Booking   </span>
           
        </div>
        <div style="width:50%">
            <span style=" line-height:22px; font-weight:bold;margin:0;height:fit-content;font-family: sans-serif; color: #0B4173;font-size: 16px; ">
                Confirmation :
            </span>
            <span style="line-height:22px; font-weight:bold; margin:0;height:fit-content;font-family: sans-serif; color: #0B4173;font-size: 16px;">
               THDFRN2203011
            </span>
              
          </div>
	    </div>
		
		 <h1 style="font-size:14px; line-height:22px; font-weight:bold; color: #0B4173;margin:0;height:fit-content;font-family:sans-serif; ">
  Wed, May 11, 2022      
<!--          ${currentDate()} -->
        </h1>
		<h1 style="font-size:14px; line-height:22px; font-weight:normal;  color: #0B4173;font-family: 'sans-serif', font-family:"Calibri, sans-serif"; ">
        Dear Customer
        </h1>
      
      
       <p style="font-size:12px; line-height:16px; color:#0B4173; margin-bottom:30px; font-family: Arial;">
       Thank you for choosing Triphelpdesk for your travel arrangements. We truly appreciate your business.
        As per our conversation and agreed, we have processed your reservation under the confirmation code 
        Your flight is now booked and is in process. Please note that you will receive the E-Ticket confirmation shortly in a separate email once the process is finalized.
		  If you need any assistance regarding changes, please contact us at <b> +1 866-270-1413</b>  or email at <b>info@triphelpdesk.com</b>
      </p>
      

    
<table class="tableoutter" style="border-collapse: collapse;margin: 0;padding: 0;width: 100%;table-layout: fixed;">
  
  
  <thead class=" tableHead ">
    <tr style="background-color: #f8f8f8;padding: 0.35em;text-align:center;">
      <th style="background-color: #fff !important; border: 0px solid #fff !important;font-size: 14px;font-weight:600;text-transform: capitalize;padding: .625em;color:#0B4173;" class="tableHeading" scope="col" name="firstname">First Name</th>
      <th style="background-color: #fff !important; border: 0px solid #fff !important;font-size: 14px;font-weight:600;text-transform: capitalize;padding: .625em;color:#0B4173;"class="tableHeading" scope="col" name="middlename">Middle Name</th>
      <th style="background-color: #fff !important; border: 0px solid #fff !important;font-size: 14px;font-weight:600;text-transform: capitalize;padding: .625em;color:#0B4173;"class="tableHeading" scope="col" name="lastname" >Last Name</th>
      <th style="background-color: #fff !important; border: 0px solid #fff !important;font-size: 14px;font-weight:600;text-transform: capitalize;padding: .625em;color:#0B4173;" class="tableHeading" scope="col" name="Ticket">Ticket </th>
      <th style="background-color: #fff !important; border: 0px solid #fff !important;font-size: 14px;font-weight:600;text-transform: capitalize;padding: .625em;color:#0B4173;"scope="col"  class="tableHeading" name="confirmation" >Confirmation</th>
       <th style="background-color: #fff !important; border: 0px solid #fff !important;font-size: 14px;font-weight:600;text-transform: capitalize;padding: .625em;color:#0B4173;" scope="col"  class="tableHeading" name="price">Price</th>
      
    </tr>
  </thead>
  <tbody id='appendCHildHere' >
    

<!-- 		${userTabelData1()} -->
    <tr style="background-color: #f8f8f8;padding: 0.35em;text-align:center;">
		  <td style=" padding: .625em;font-size:14px;color:#0B4173;font-weight:600;" class="tableHeading" scope="col" name="firstname">john</td>
		  <td style=" padding: .625em;font-size:14px;color:#0B4173;font-weight:600;" class="tableHeading" scope="col" name="firstname">D</td>
		  <td style=" padding: .625em;font-size:14px;color:#0B4173;font-weight:600;" class="tableHeading" scope="col" name="firstname">doe</td>
		  <td style=" padding: .625em;font-size:14px;color:#0B4173;font-weight:600;" class="tableHeading" scope="col" name="firstname">2.72136E+11</td>
		  <td style=" padding: .625em;font-size:14px;color:#0B4173;font-weight:600;" class="tableHeading" scope="col" name="firstname">KFQHMW</td>
		  <td style=" padding: .625em;font-size:14px;color:#0B4173;font-weight:600;" class="tableHeading" scope="col" name="firstname">200</td>
		</tr>
<!--  Repeating code 2 more times    -->
  
     <tr style="background-color: #f8f8f8;padding: 0.35em;text-align:center;">
		  <td style=" padding: .625em;font-size:14px;color:#0B4173;font-weight:600;" class="tableHeading" scope="col" name="firstname">john</td>
		  <td style=" padding: .625em;font-size:14px;color:#0B4173;font-weight:600;" class="tableHeading" scope="col" name="firstname">D</td>
		  <td style=" padding: .625em;font-size:14px;color:#0B4173;font-weight:600;" class="tableHeading" scope="col" name="firstname">doe</td>
		  <td style=" padding: .625em;font-size:14px;color:#0B4173;font-weight:600;" class="tableHeading" scope="col" name="firstname">2.72136E+11</td>
		  <td style=" padding: .625em;font-size:14px;color:#0B4173;font-weight:600;" class="tableHeading" scope="col" name="firstname">KFQHMW</td>
		  <td style=" padding: .625em;font-size:14px;color:#0B4173;font-weight:600;" class="tableHeading" scope="col" name="firstname">200</td>
		</tr>
    
     <tr style="background-color: #f8f8f8;padding: 0.35em;text-align:center;">
		  <td style=" padding: .625em;font-size:14px;color:#0B4173;font-weight:600;" class="tableHeading" scope="col" name="firstname">john</td>
		  <td style=" padding: .625em;font-size:14px;color:#0B4173;font-weight:600;" class="tableHeading" scope="col" name="firstname">D</td>
		  <td style=" padding: .625em;font-size:14px;color:#0B4173;font-weight:600;" class="tableHeading" scope="col" name="firstname">doe</td>
		  <td style=" padding: .625em;font-size:14px;color:#0B4173;font-weight:600;" class="tableHeading" scope="col" name="firstname">2.72136E+11</td>
		  <td style=" padding: .625em;font-size:14px;color:#0B4173;font-weight:600;" class="tableHeading" scope="col" name="firstname">KFQHMW</td>
		  <td style=" padding: .625em;font-size:14px;color:#0B4173;font-weight:600;" class="tableHeading" scope="col" name="firstname">200</td>
		</tr>
    <!--  Repeating code 2 more times    -->

   
  
  </tbody>
</table>






     
 <!--         TotalAmount -->

        <p style=" line-height: 18px;  color: #0B4173;font-size: 14px;margin-bottom: 5px; font-weight: 600;font-family:Helvetica;padding: 0 1rem;">Total amount charged $
    
             in the name of  ending in ""xxxx0092""   (charges may be seen split up between Valalto, THD, suppliers or the airlines directly - total amount charged will equal the above).
        </p>
              
         
       

      <table class="tableoutter" style="border-collapse: collapse;margin: 0;padding: 0;width: 100%;table-layout: fixed;">
  
 
    
       <td style=" padding: .625em;font-size:14px;color:#0B4173;font-weight:600;" scope="row" style="font-size: 11px; text-align:unset;">
       <b>Tue, 26 Apr</b> - Alaska Airlines 2057 - Operated By Subsidiary/Franchise - Economy - 1h 40m
       </td>
      </table>
      <table class="tableoutter" style="border-collapse: collapse;margin: 0;padding: 0;width: 100%;table-layout: fixed;">
       <td style=" padding: .625em;font-size:14px;color:#0B4173;font-weight:600;" scope="row" style="font-size: 11px; text-align:unset;">
       <b>Departing:</b> Portland Airport, Oregon (PDX) at 6:15 pm
       </td>
      </table>
      <table class="tableoutter" style="border-collapse: collapse;margin: 0;padding: 0;width: 100%;table-layout: fixed;">
            <td style=" padding: .625em;font-size:14px;color:#0B4173;font-weight:600;" scope="row" style="font-size: 11px; text-align:unset;">
            <b> Arriving: </b>San Francisco Oakland Airport, Oakland (OAK) at 7:55 pm
            </td>
      </table>
        
       
      <div style="display:flex;justify-content:center; padding:15px">

      ${
			isPreviewed
				? `
          <a
            style='display:inline-block;
          border: 0;cursor: pointer;
          color: white;
          text-decoration:none;

          font-size: 16px;
          background-color: transparent;
          background-image: linear-gradient(140deg, #1882E5 0%, #01BDFE 100%);
          border-radius: 50px 50px 50px 50px;
            
          padding: 10px 30px; font-family:sans-serif;'>
            Authorize
          </a>`
				: `	<a
            style='display:inline-block;
                  border: 0;cursor: pointer;
                  color: white;
                  text-decoration:none;
                  font-size: 16px;
                  background-color: transparent;
                  background-image: linear-gradient(140deg, #1882E5 0%, #01BDFE 100%);
                  border-radius: 50px 50px 50px 50px;    	
                  padding: 10px 30px; font-family:sans-serif;'
            href='https://triphelpdesk.netlify.app/auth/validateToken'
            target='_blank'>
            Authorize
          </a>`
		}


      </div>
 




      <div>
          <p style="font-size:12px; line-height:18px; font-weight:500;color: #0B4173;margin-bottom:10px;margin:0px;border-radius:3px;padding:10px 5px; font-family:Calibri, sans-serif;">
            
              <b>Note:</b> Charges will show up as Triphelpdesk. on your credit card statement (for the same or lesser the Charge For Processing amount Per airline/travel agency request, in some cases there will be multiple charges on your statement, but all equaling the total Charge For Processing  amount. While reviewing your statement, if you have any questions on your charges do not hesitate to reach out to your agent or our help desk @<b><u><a href="tel:8662701413"> 866-270-1413</a></u></b> or email
              <b><u><a href = "mailto:info@triphelpdesk.com">info@triphelpdesk.com </a></u></b>
      <br/>
      <br/>
      <b>Changes and Cancellations :  </b>are subject to airline change fee if any / fare difference if any / service fee if any.  Please consult your agent at time of booking to find out more.
      <br/>
      <br/>
      <b>24 Hour Cancelation Policy:</b> From time of booking you can cancel your ticket within 24 hours for a full refund (travel inside 48 hours will not allow for a full refund and subject to fees and THD/Airline Policy)
      <br/>
      <br/>
      Trip Help Desk powered by Valalto Inc. is a service provider for all your travel needs. We're happy to help on new bookings, old bookings, and any service imaginable in the travel industry. If you need help, we're here!
            </p>
      </div>

     
          <hr style="margin:2px;height: 2px;background: #051A2E;border-radius: 10px;"/>
            
            <p style=" line-height:18px;  margin-bottom:10px; color: #0B4173;font-size: 14px;">
              &copy; Copyright 2022
              <a href="https://valalto.com/"
                style="line-height:18px;color: #0B4173;font-size: 14px; font-weight:bold;">
                Valalto Inc.</a>, All Rights Reserved.
            </p>
            
          
            
</div>`;

	var Exchange = `<center>
		<style>
    table.tableoutter {

  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
     
}

      

table.tableoutter tr {
  background-color: #f8f8f8;  
  padding: .35em;
  text-align:center;
}

table.tableoutter tr th{
  background-color: #fff !important;  
  border: 0px solid #fff !important;
}
table.tableoutter th,
table.tableoutter td {
  padding: .625em;
  font-size:14px;
  color:#0B4173;
   font-weight:600;

}

table.tableoutter th {
  font-size: 14px;
  color:#0B4173;
  font-weight:600;
  text-transform: capitalize;
}

@media screen and (max-width: 600px) {
  table.tableoutter {
    border: 0;
  }


  
  table.tableoutter thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
  
  table.tableoutter tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: .625em;
  }
  
  table.tableoutter td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: .8em;
    text-align: right;
  }
  
  table.tableoutter td::before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }
  
  table.tableoutter td:last-child {
    border-bottom: 0;
  }
}



</style>
    
    <div style="width:80vw;background:#ffffff; padding:p-x 10px;font-weight:500; text-align:left;  font-family:Calibri, sans-serif;">
		
      <p style="font-size:13px; line-height:16px; color:#0B4173; margin:0px;border-radius:3px;padding:10px 5px;  font-family:Calibri, sans-serif;">
        By approving via email you are agreeing to the terms of invoice and authorize Trip Help Desk powered by Valalto to complete your "Requested Service".  Your authorization is for the use of this invoice and for no other purpose. 
      </p>
      
		<hr style="margin:2px;height: 2px;background: #051A2E;border-radius: 10px;"/>
		  <h1 style="font-size:14px; text-align:right; line-height:22px; font-weight:normal; color:#0B4173;font-family:sans-serif;">
			  Trip Help Desk Powered By <b style="color: #0B4173;font-size: 16px;">Valalto Inc.</b>	
         </h1>
          
		<div style="display:flex;justify-content:space-between;">
		
  
            <h1 style="color: #0B4173;font-size: 16px; line-height:22px; font-weight:bold; margin:0;height:fit-content;font-family: sans-serif; ">
                Invoice
              
            </h1>
            <h1 style=" line-height:22px; font-weight:bold;margin:0;height:fit-content;font-family: sans-serif; color: #0B4173;font-size: 16px; ">
                Confirmation :
            </h1>
            <h1 style="line-height:22px; font-weight:bold; margin:0;height:fit-content;font-family: sans-serif; color: #0B4173;font-size: 16px;">
               THDFRN2203011
            </h1>
	    </div>
		
		
		 <h1 style="font-size:14px; line-height:22px; font-weight:bold; color: #0B4173;margin:0;height:fit-content;font-family:sans-serif; ">
<!--    Wed, May 11, 2022      -->
         ${currentDate()}
        </h1>
		<h1 style="font-size:14px; line-height:22px; font-weight:600; color: #0B4173;font-family:Arial; ">
   Requested Service: Exchange
        </h1>
      
 <p style="font-size:12px; line-height:16px; color:#0B4173; margin-bottom:30px; font-family: Arial;">
       Per your request, Trip Help Desk will be changing your original itinerary to the new details mentioned below.
Once completed your agent will notify you and you'll be able to access the reservation on the airlines website to view and manage your new flight.
		  If you need any assistance regarding changes, please contact us at <b> +1 866-270-1413</b>  or email at <b>info@triphelpdesk.com</b>
      </p>
      

    
<table class="tableoutter">
  
  <thead class=" tableHead ">
    <tr>
      <th class="tableHeading" scope="col" name="firstname">First Name</th>
       <th class="tableHeading" scope="col" name="firstname">Middle Name</th>
      <th class="tableHeading" scope="col" name="lastname" >Last Name</th>
      <th  class="tableHeading" scope="col" name="Ticket">Ticket </th>
    
       <th scope="col"  class="tableHeading" name="price">Price</th>
      
    </tr>
  </thead>
  <tbody id='appendCHildHere' >
    
<!--     -->
    ${userTabelData2()}
    <tr>
      <td class="tableHeading" scope="col" name="firstname">Kelly</td>
      <td class="tableHeading" scope="col" name="lastname" >D	</td>
       <td class="tableHeading" scope="col" name="lastname" >Cluff	</td>
      
      <td  class="tableHeading" scope="col" name="Ticket">Under Process	 </td>
      <td scope="col"  class="tableHeading" name="confirmation" >	$140.00		</td>
       
      
    </tr>
     	
  
  </tbody>
</table>

      

          <p style="text-align:right; line-height: 16px;  color: #0B4173;font-size: 12px;margin-bottom: 5px; font-weight: 600;font-family:Helvetica;padding: 0 1rem;">* Baggage Fee May Apply . Check with Airlines for the Most Updated Baggage Rule.
        </p>
              
          
      
     
           <table class="tableoutter" style="margin-top:1rem;display: inline-block;border: 0; ">
  
    

   
    <tr>
      <td style="font-weight:bold;"   name="firstname">Total Amount Charged : 	</td>
      <td  style=""  name="lastname" > USD	$0.00</td>
       
       
      
    </tr>
          <tr>
      <td style="font-weight:bold;" name="firstname">Name of Card holder	 :	</td>
      <td style=""  name="lastname" >Crystal A Daniell</td>
       
       
      
    </tr>  <tr>
      <td style="font-weight:bold;"  name="firstname">Card Ending	:	</td>
      <td style=""  name="lastname" >xxxx-	2778</td>
       
       
      
    </tr>
     	
 
</table>
      





     
        
       

       <table class="tableoutter">
  
 
    
       <td scope="row" style="font-size: 11px; text-align:unset;"> 
       <b>Tue, 26 Apr</b> - Alaska Airlines 2057 - Operated By Subsidiary/Franchise - Economy - 1h 40m 
       </td>
</table>
<table class="tableoutter">
       <td scope="row" style="font-size: 11px; text-align:unset;"> 
       <b>Departing:</b> Portland Airport, Oregon (PDX) at 6:15 pm
       </td>
       </table>
<table class="tableoutter">
       <td scope="row" style="font-size: 11px; text-align:unset;"> 
      <b> Arriving: </b>San Francisco Oakland Airport, Oakland (OAK) at 7:55 pm
       </td>
</table>
        
       
      

<div style="display:flex;justify-content:center; padding:15px">
 ${
		isPreviewed
			? `
		<a
			style='display:inline-block;
    border: 0;cursor: pointer;
    color: white;
    text-decoration:none;

    font-size: 16px;
    background-color: transparent;
    background-image: linear-gradient(140deg, #1882E5 0%, #01BDFE 100%);
    border-radius: 50px 50px 50px 50px;
    	
    padding: 10px 30px; font-family:sans-serif;'>
			Authorize
		</a>`
			: `	<a
			style='display:inline-block;
            border: 0;cursor: pointer;
            color: white;
            text-decoration:none;
            font-size: 16px;
            background-color: transparent;
            background-image: linear-gradient(140deg, #1882E5 0%, #01BDFE 100%);
            border-radius: 50px 50px 50px 50px;    	
            padding: 10px 30px; font-family:sans-serif;'
			href='https://triphelpdesk.netlify.app/auth/validateToken'
			target='_blank'>
			Authorize
		</a>`
 }
</div>








 <div> 
     <p style="font-size:12px; line-height:18px; font-weight:500;color: #0B4173;margin-bottom:10px;margin:0px;border-radius:3px;padding:10px 5px; font-family:Calibri, sans-serif;">
       
        <b>Note:</b> Charges will show up as Triphelpdesk. on your credit card statement (for the same or lesser the Charge For Processing amount Per airline/travel agency request, in some cases there will be multiple charges on your statement, but all equaling the total Charge For Processing  amount. While reviewing your statement, if you have any questions on your charges do not hesitate to reach out to your agent or our help desk @<b><u><a href="tel:8662701413"> 866-270-1413</a></u></b> or email 
        <b><u><a href = "mailto:info@triphelpdesk.com">info@triphelpdesk.com </a></u></b> 
<br/>
<br/>
 <b>Changes and Cancellations :  </b>are subject to airline change fee if any / fare difference if any / service fee if any.  Please consult your agent at time of booking to find out more. 
<br/>
<br/>
<b>24 Hour Cancelation Policy:</b> From time of booking you can cancel your ticket within 24 hours for a full refund (travel inside 48 hours will not allow for a full refund and subject to fees and THD/Airline Policy)
<br/>
<br/>
Trip Help Desk powered by Valalto Inc. is a service provider for all your travel needs. We're happy to help on new bookings, old bookings, and any service imaginable in the travel industry. If you need help, we're here!
      </p>
       <div>

 </div>
    <hr style="margin:2px;height: 2px;background: #051A2E;border-radius: 10px;"/>
      
      <p style=" line-height:18px;  margin-bottom:10px; color: #0B4173;font-size: 14px;">
        &copy; Copyright 2022 
        <a href="https://valalto.com/" 
           style="line-height:18px;color: #0B4173;font-size: 14px; font-weight:bold;">
          Valalto Inc.</a>, All Rights Reserved.
      </p>
      
     
      
    </div>
      
    </center >`;

	var futureCredit = `<center>
		<style>
    table.tableoutter {

  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
     
}

      

table.tableoutter tr {
  background-color: #f8f8f8;  
  padding: .35em;
  text-align:center;
}

table.tableoutter tr th{
  background-color: #fff !important;  
  border: 0px solid #fff !important;
}
table.tableoutter th,
table.tableoutter td {
  padding: .625em;
  font-size:14px;
  color:#0B4173;
   font-weight:600;

}

table.tableoutter th {
  font-size: 14px;
  color:#0B4173;
  font-weight:600;
  text-transform: capitalize;
}

@media screen and (max-width: 600px) {
  table.tableoutter {
    border: 0;
  }


  
  table.tableoutter thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
  
  table.tableoutter tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: .625em;
  }
  
  table.tableoutter td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: .8em;
    text-align: right;
  }
  
  table.tableoutter td::before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }
  
  table.tableoutter td:last-child {
    border-bottom: 0;
  }
}



</style>
    
    <div style="width:80vw;background:#ffffff; padding:p-x 10px;font-weight:500; text-align:left;  font-family:Calibri, sans-serif;">
		
      <p style="font-size:13px; line-height:16px; color:#0B4173; margin:0px;border-radius:3px;padding:10px 5px;  font-family:Calibri, sans-serif;">
        By approving via email you are agreeing to the terms of invoice and authorize Trip Help Desk powered by Valalto to complete your "Requested Service".  Your authorization is for the use of this invoice and for no other purpose. 
      </p>
      
		<hr style="margin:2px;height: 2px;background: #051A2E;border-radius: 10px;"/>
		  <h1 style="font-size:14px; text-align:right; line-height:22px; font-weight:normal; color:#0B4173;font-family:sans-serif;">
			  Trip Help Desk Powered By <b style="color: #0B4173;font-size: 16px;">Valalto Inc.</b>	
         </h1>
          
		<div style="display:flex;justify-content:space-between;">
		
  
            <h1 style="color: #0B4173;font-size: 16px; line-height:22px; font-weight:bold; margin:0;height:fit-content;font-family: sans-serif; ">
                Invoice
              
            </h1>
            <h1 style=" line-height:22px; font-weight:bold;margin:0;height:fit-content;font-family: sans-serif; color: #0B4173;font-size: 16px; ">
                Confirmation :
            </h1>
            <h1 style="line-height:22px; font-weight:bold; margin:0;height:fit-content;font-family: sans-serif; color: #0B4173;font-size: 16px;">
               THDFRN2203011
            </h1>
	    </div>
		
		
		 <h1 style="font-size:14px; line-height:22px; font-weight:bold; color: #0B4173;margin:0;height:fit-content;font-family:sans-serif; ">
<!--    Wed, May 11, 2022      -->
         ${currentDate()}
        </h1>
		<h1 style="font-size:14px; line-height:22px; font-weight:600; color: #0B4173;font-family:Arial; ">
   Requested Service: Cancellation of Airline Ticket For Credi
        </h1>
      
		
      
       <p style="font-size:12px; line-height:16px; color:#0B4173; margin-bottom:30px; font-family: Arial;">
       Your cancelation for future credit is in process and will be submitted to the airlines to finalize. Once completed, you'll have a credit with the airlines for the amount. (credit and rebooking fees are subject to the ailrine policy). You can contact us or the airlines directly when it's time to use your airline credit - Trip Help Desk is more than happy to help!
		 
      </p>
      

    
<table class="tableoutter">
  
  <thead class=" tableHead ">
    <tr>
      <th class="tableHeading" scope="col" name="firstname"> First Name</th>
       <th class="tableHeading" scope="col" name="middlename"> Middle  Name</th>
       <th class="tableHeading" scope="col" name="lasstname"> Last Name</th>
      
       <th scope="col"  class="tableHeading" name="price">Confirmation</th>
      
    </tr>
  </thead>
  <tbody id='appendCHildHere' >
    
      ${userTabelData4()}
   
    <tr>
      <td class="tableHeading" scope="col" name="firstname">Keith Hicks	</td>
       <td class="tableHeading" scope="col" name="firstname">Keith Hicks	</td>
       <td class="tableHeading" scope="col" name="firstname">Keith Hicks	</td>
      
      <td class="tableHeading" scope="col" name="lastname" >DJT2JJ</td>
       
       
      
    </tr>
     	
  
  </tbody>
</table>

      
      
      <table class="tableoutter" style="margin-top:1rem;display: inline-block;border: 0; ">
  
    

   
    <tr>
      <td style=""   name="firstname">Airline : 	</td>
      <td  style=" width:100px"  name="lastname" ></td>
       
       
      
    </tr>
          <tr>
      <td style="" name="firstname">Credit :	</td>
      <td style="  name="lastname" >$	</td>
       
       
      
    </tr>  <tr>
      <td style=""  name="firstname">Valid Till :	</td>
      <td style=""  name="lastname" ></td>
       
       
      
    </tr>
     	
 
</table>
      
      

     
<div style="display:flex;justify-content:center; padding:15px">
${
	isPreviewed
		? `
		<a
			style='display:inline-block;
    border: 0;cursor: pointer;
    color: white;
    text-decoration:none;

    font-size: 16px;
    background-color: transparent;
    background-image: linear-gradient(140deg, #1882E5 0%, #01BDFE 100%);
    border-radius: 50px 50px 50px 50px;
    	
    padding: 10px 30px; font-family:sans-serif;'>
			Authorize
		</a>`
		: `	<a
			style='display:inline-block;
            border: 0;cursor: pointer;
            color: white;
            text-decoration:none;
            font-size: 16px;
            background-color: transparent;
            background-image: linear-gradient(140deg, #1882E5 0%, #01BDFE 100%);
            border-radius: 50px 50px 50px 50px;    	
            padding: 10px 30px; font-family:sans-serif;'
			href='https://triphelpdesk.netlify.app/auth/validateToken'
			target='_blank'>
			Authorize
		</a>`
}
</div>
          
       

          
      
      <p style="font-size:12px; line-height:18px; font-weight:500;color: #0B4173;margin-bottom:10px;margin:0px;border-radius:3px;padding:10px 5px; font-family:Calibri, sans-serif;">
       
        <b>Note:</b> Charges will show up as Triphelpdesk. on your credit card statement (for the same or lesser the Charge For Processing amount Per airline/travel agency request, in some cases there will be multiple charges on your statement, but all equaling the total Charge For Processing  amount. While reviewing your statement, if you have any questions on your charges do not hesitate to reach out to your agent or our help desk @<b><u><a href="tel:8662701413"> 866-270-1413</a></u></b> or email 
        <b><u><a href = "mailto:info@triphelpdesk.com">info@triphelpdesk.com </a></u></b> 
<br/>
<br/>
 <b>Changes and Cancellations :  </b>are subject to airline change fee if any / fare difference if any / service fee if any.  Please consult your agent at time of booking to find out more. 
<br/>
<br/>
<b>24 Hour Cancelation Policy:</b> From time of booking you can cancel your ticket within 24 hours for a full refund (travel inside 48 hours will not allow for a full refund and subject to fees and THD/Airline Policy)
<br/>
<br/>
Trip Help Desk powered by Valalto Inc. is a service provider for all your travel needs. We're happy to help on new bookings, old bookings, and any service imaginable in the travel industry. If you need help, we're here!
      </p>
      
       </div>


       <div>
         
         
         

    
        
       
       </div>











    <hr style="margin:2px;height: 2px;background: #051A2E;border-radius: 10px;"/>
      
      <p style=" line-height:18px;  margin-bottom:10px; color: #0B4173;font-size: 14px;">
        &copy; Copyright 2022 
        <a href="https://valalto.com/" 
           style="line-height:18px;color: #0B4173;font-size: 14px; font-weight:bold;">
          Valalto Inc.</a>, All Rights Reserved.
      </p>
      
     
      
    </div>
      
    </center >`;

	var Refund = `<center>
		<style>
    table.tableoutter {

  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
     
}

      

table.tableoutter tr {
  background-color: #f8f8f8;  
  padding: .35em;
  text-align:center;
}

table.tableoutter tr th{
  background-color: #fff !important;  
  border: 0px solid #fff !important;
}
table.tableoutter th,
table.tableoutter td {
  padding: .625em;
  font-size:14px;
  color:#0B4173;
   font-weight:600;

}

table.tableoutter th {
  font-size: 14px;
  color:#0B4173;
  font-weight:600;
  text-transform: capitalize;
}

@media screen and (max-width: 600px) {
  table.tableoutter {
    border: 0;
  }


  
  table.tableoutter thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
  
  table.tableoutter tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: .625em;
  }
  
  table.tableoutter td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: .8em;
    text-align: right;
  }
  
  table.tableoutter td::before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }
  
  table.tableoutter td:last-child {
    border-bottom: 0;
  }
}



</style>
    
    <div style="width:80vw;background:#ffffff; padding:p-x 10px;font-weight:500; text-align:left;  font-family:Calibri, sans-serif;">
		
      <p style="font-size:13px; line-height:16px; color:#0B4173; margin:0px;border-radius:3px;padding:10px 5px;  font-family:Calibri, sans-serif;">
        By approving via email you are agreeing to the terms of invoice and authorize Trip Help Desk powered by Valalto to complete your "Requested Service".  Your authorization is for the use of this invoice and for no other purpose. 
      </p>
      
		<hr style="margin:2px;height: 2px;background: #051A2E;border-radius: 10px;"/>
		  <h1 style="font-size:14px; text-align:right; line-height:22px; font-weight:normal; color:#0B4173;font-family:sans-serif;">
			  Trip Help Desk Powered By <b style="color: #0B4173;font-size: 16px;">Valalto Inc.</b>	
         </h1>
          
		<div style="display:flex;justify-content:space-between;">
		
  
            <h1 style="color: #0B4173;font-size: 16px; line-height:22px; font-weight:bold; margin:0;height:fit-content;font-family: sans-serif; ">
                Invoice
              
            </h1>
            <h1 style=" line-height:22px; font-weight:bold;margin:0;height:fit-content;font-family: sans-serif; color: #0B4173;font-size: 16px; ">
                Confirmation :
            </h1>
            <h1 style="line-height:22px; font-weight:bold; margin:0;height:fit-content;font-family: sans-serif; color: #0B4173;font-size: 16px;">
               THDFRN2203011
            </h1>
	    </div>
		
		
		 <h1 style="font-size:14px; line-height:22px; font-weight:bold; color: #0B4173;margin:0;height:fit-content;font-family:sans-serif; ">
        ${currentDate()}
 <!--        Wed, May 11, 2022  -->
        </h1>
		<h1 style="font-size:14px; line-height:22px; font-weight:600; color: #0B4173;font-family:Arial; ">
   Requested Service:Refund
        </h1>
      
      
      <p style="font-size:12px; line-height:16px; color:#0B4173; margin-bottom:30px; font-family: Arial;">
       Your refund is in process and will be submitted to the airlines to finalize. Once completed, you'll receive a refund from the airlines for the amount quoted below:
        <br/>
		  
      </p>
      

    
<table class="tableoutter">
  
  <thead class=" tableHead ">
    <tr>
      <th class="tableHeading" scope="col" name="firstname"> First Name</th>
      <th class="tableHeading" scope="col" name="middlename"> Middle Name</th>
      <th class="tableHeading" scope="col" name="lastname"> Last Name</th>
      
       <th scope="col"  class="tableHeading" name="refund">Refund</th>
      
    </tr>
  </thead>
  <tbody id='appendCHildHere' >
    

		${userTabelData3()}

     <!-- 
    <tr>
      <td class="tableHeading" scope="col" name="firstname">Keith Hicks	</td>
      <td class="tableHeading" scope="col" name="lastname" >DJT2JJ</td>
       
       
   
    </tr>
     	 <tr>
      <td class="tableHeading" scope="col" name="firstname"> 
        <b>Grand Total (Expected Refund From Airlines)	<b/></td>
      <td class="tableHeading" scope="col" name="lastname" >
        <b>USD	$150.00<b/></td>
       
       
      
    </tr>
    -->
  		
  </tbody>
</table>

      
      
      <table class="tableoutter" style="margin-top:1rem;display: inline-block;border: 0; ">
  
    

   
    <tr>
      <td style="font-weight:bold;"   name="firstname">Total Amount Charged : 	</td>
      <td  style=""  name="lastname" > USD	$0.00</td>
       
       
      
    </tr>
          <tr>
      <td style="font-weight:bold;" name="firstname">Name of Card holder	 :	</td>
      <td style=""  name="lastname" >Crystal A Daniell</td>
       
       
      
    </tr>  <tr>
      <td style="font-weight:bold;"  name="firstname">Card Ending	:	</td>
      <td style=""  name="lastname" >xxxx-	2778</td>
       
       
      
    </tr>
     	
 
</table>
      
      

     
          
       

${
	isPreviewed
		? `
		<a
			style='display:inline-block;
    border: 0;cursor: pointer;
    color: white;
    text-decoration:none;

    font-size: 16px;
    background-color: transparent;
    background-image: linear-gradient(140deg, #1882E5 0%, #01BDFE 100%);
    border-radius: 50px 50px 50px 50px;
    	
    padding: 10px 30px; font-family:sans-serif;'>
			Authorize
		</a>`
		: `	<a
			style='display:inline-block;
            border: 0;cursor: pointer;
            color: white;
            text-decoration:none;
            font-size: 16px;
            background-color: transparent;
            background-image: linear-gradient(140deg, #1882E5 0%, #01BDFE 100%);
            border-radius: 50px 50px 50px 50px;    	
            padding: 10px 30px; font-family:sans-serif;'
			href='https://triphelpdesk.netlify.app/auth/validateToken'
			target='_blank'>
			Authorize
		</a>`
}
</div>
          
<!--         <div class="paymentMessage" style="background: #E6F1FC;">  -->

           
              
<!--             </div> -->
      <div>

      <p style="font-size:12px; line-height:18px; font-weight:500;color: #0B4173;margin-bottom:10px;margin:0px;border-radius:3px;padding:10px 5px; font-family:Calibri, sans-serif;">
       
        <b>Note:</b> Charges will show up as Triphelpdesk. on your credit card statement (for the same or lesser the Charge For Processing amount Per airline/travel agency request, in some cases there will be multiple charges on your statement, but all equaling the total Charge For Processing  amount. While reviewing your statement, if you have any questions on your charges do not hesitate to reach out to your agent or our help desk @<b><u><a href="tel:8662701413"> 866-270-1413</a></u></b> or email 
        <b><u><a href = "mailto:info@triphelpdesk.com">info@triphelpdesk.com </a></u></b> 
<br/>
<br/>
 <b>Changes and Cancellations :  </b>are subject to airline change fee if any / fare difference if any / service fee if any.  Please consult your agent at time of booking to find out more. 
<br/>
<br/>
<b>24 Hour Cancelation Policy:</b> From time of booking you can cancel your ticket within 24 hours for a full refund (travel inside 48 hours will not allow for a full refund and subject to fees and THD/Airline Policy)
<br/>
<br/>
Trip Help Desk powered by Valalto Inc. is a service provider for all your travel needs. We're happy to help on new bookings, old bookings, and any service imaginable in the travel industry. If you need help, we're here!
      </p>
      
       </div>


       <div>
         
         
         

    
        
       
       </div>











    <hr style="margin:2px;height: 2px;background: #051A2E;border-radius: 10px;"/>
      
      <p style=" line-height:18px;  margin-bottom:10px; color: #0B4173;font-size: 14px;">
        &copy; Copyright 2022 
        <a href="https://valalto.com/" 
           style="line-height:18px;color: #0B4173;font-size: 14px; font-weight:bold;">
          Valalto Inc.</a>, All Rights Reserved.
      </p>
      
     
      
    </div>
      
    </center >`;
	const handleSendEmail = async () => {
		axios
			.post(BASEURL + '/ticket/email', {
				data: getSelectedEmail(),
				ticketId: Ticketid,
			})
			.then((res) => {
				console.log(res);
				successToast('Email sent Successfully');
			})
			.catch((e) => console.log(e));
	};

	return (
		<>
			<Paper elevation={1}>
				<Box sx={{m: 0, p: 2}}>{renderingEmail()} </Box>
			</Paper>

			<Grid container spacing={1} sx={{m: 0, p: 1}}>
				<Grid item xs={6} md={10}></Grid>

				<Grid item xs={6} md={2} sx={{mb: 3}}>
					<Button onClick={handleSendEmail} variant='contained' endIcon={<SendIcon />}>
						Send Mail
					</Button>
				</Grid>
			</Grid>
		</>
	);
};

export default Email1;
