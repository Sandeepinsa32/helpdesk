import React, {useState} from 'react';
import {Grid, Button, Box, Paper} from '@mui/material';
// @mat_icon
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import {BASEURL, successToast} from '../../utils/Utils';

const RenderSelectedEmail = ({selectedEmailTemplate, Tabledata, pnrData, recordData, Ticketid, onClose}) => {
	console.log(selectedEmailTemplate, pnrData);
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

			if (isEmpty) {
				return;
			}

			tableString =
				tableString +
				`<tr>
		  <td style="padding: 4px; text-align: left; border: 1px solid rgba(0, 0, 0, 0.2);" >${x.firstName}</td>
		  <td style="padding: 4px; text-align: left; border: 1px solid rgba(0, 0, 0, 0.2);">${x.middleName}</td>
		  <td style="padding: 4px; text-align: left; border: 1px solid rgba(0, 0, 0, 0.2);">${x.lastName}</td>
		  <td style="padding: 4px; text-align: left; border: 1px solid rgba(0, 0, 0, 0.2);">${x.ticket}</td>
		  <td style="padding: 4px; text-align: left; border: 1px solid rgba(0, 0, 0, 0.2);">${x.confirmation}</td>
		  <td style="padding: 4px; text-align: left; border: 1px solid rgba(0, 0, 0, 0.2);">${x.price}</td>
		</tr>`;
		});

		return tableString;
	}
	function userTabelData2() {
		var tableString = '';
		Tabledata.forEach((x) => {
			const isEmpty = Object.values(x).every((obj) => obj === null || obj === '');

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
		var tableString = '';
		Tabledata.forEach((x) => {
			const isEmpty = Object.values(x).every((obj) => obj === null || obj === '');

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
		var tableString = '';
		Tabledata.forEach((x) => {
			const isEmpty = Object.values(x).every((obj) => obj === null || obj === '');

			if (isEmpty) {
				return;
			}

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
	var newBooking = `<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="styles.css">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EMail</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
   <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200">
    
  </head>
  <body style="font-family: Calibri, sans-serif;">
    <div class="main " style="border: 0px solid; margin: 0px auto; overflow: hidden; background-size: cover; max-width: 600px; background-image: linear-gradient(
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.7)
    ),
    url('https://i.ibb.co/H7jc6Q7/download.png'); padding: 10px; color: rgba(0, 0, 0, 0.9); box-shadow: 0 1px 1px rgba(0, 0, 0, 0.11), 0 2px 2px rgba(0, 0, 0, 0.11),
    0 4px 4px rgba(0, 0, 0, 0.11), 0 6px 8px rgba(0, 0, 0, 0.11),
    0 8px 16px rgba(0, 0, 0, 0.11); background-position: bottom; background-repeat: no-repeat; background-color: #efefef;">
      <div style="
    background-color: #efefef  !important;
    margin: -7px;
">
       <img src="https://triphelpdesk.com/wp-content/uploads/2022/01/Logo.png" alt="" style="width: 200px; display: block; margin-bottom: 4px; margin: 0 auto;" width="200">
      <div style="text-align:center;">
        
      
         

        
        <a href="tel:8662701413" target="_blank" style="margin:4px 0 ;text-decoration:none;color: #0B4173;display:block">

           +1 8662701413
          </a>
          <a href="mailto:info@triphelpdesk.com" target="_blank" style="margin:4px 0 ;text-decoration:none;color: #0B4173;display:block">
        
           info@TripHelpDesk.com
          </a>
          <a href="https://triphelpdesk.com/" target="_blank" style="margin:4px 0 ;text-decoration:none;color: #0B4173;display:block">
    
           www.TripHelpDesk.com
          </a>
          <a href="#" target="_blank" style="margin:4px 0 ; padding: 0;text-decoration:none;color: #0B4173;display:block">
164 20th Street, Suite 2B, Brooklyn, NY
          11232, USA</a>
        </div>
      </div>
      <hr>
     

     <p style="margin:0 ;">
            Ticket Id:
            <span style="font-weight: 600;">THD457S58</span>
          </p>

        <p style="margin:2px 0;  ">
          ${currentDate()}
        </p>
      <p class="para-font" style="font-family: Arial; font-size: 14px; text-align: justify; text-rendering: optimizespeed; text-transform: capitalize; line-height: 20px;">
     Thank you for choosing Triphelpdesk for your travel arrangements. We truly appreciate your business.
        As per our conversation and agreed, we have processed your reservation under the confirmation code 
        Your flight is now booked and is in process. Please note that you will receive the E-Ticket confirmation shortly in a separate email once the process is finalized.
		  If you need any assistance regarding changes, please contact us at 
        <b><a href="tel:8662701413" style=" color:#0B4173;text-decoration:none;">+1 866-270-1413</a></b> or email
              <b><a href="mailto:info@triphelpdesk.com" style="text-decoration:none; color:#0B4173;">info@triphelpdesk.com </a></b>
        
        
       
      
        </p><p class="para-font" style="font-family: Arial; font-size: 14px; text-align: justify; text-rendering: optimizespeed; text-transform: capitalize; line-height: 20px;">
        By approving via email you are agreeing to the terms of invoice and authorize Trip Help Desk powered by Valalto to complete your "Requested Service".  Your authorization is for the use of this invoice and for no other purpose. 
      </p>
      
      
    
      <div class="scrollable-table" style="overflow-x: scroll; max-width: 600px; margin-bottom: 20px;">
        <table style="width: 100%; max-width: 600px; border-collapse: collapse; margin: 10px auto; padding: 4px; text-align: left; border: 1px solid rgba(0, 0, 0, 0.2);" width="100%"  align="left">
        <tr style="padding: 4px; text-align: left; border: 1px solid rgba(0, 0, 0, 0.2);" align="left">
            <th style="padding: 4px; text-align: left; border: 1px solid rgba(0, 0, 0, 0.2);" align="left">First Name</th>
            <th style="padding: 4px; text-align: left; border: 1px solid rgba(0, 0, 0, 0.2);" align="left">Middle Name</th>
            <th style="padding: 4px; text-align: left; border: 1px solid rgba(0, 0, 0, 0.2);" align="left">Last Name</th>
            <th style="padding: 4px; text-align: left; border: 1px solid rgba(0, 0, 0, 0.2);" align="left">Ticket</th>
            <th style="padding: 4px; text-align: left; border: 1px solid rgba(0, 0, 0, 0.2);" align="left">Confirmation</th>
            <th style="padding: 4px; text-align: left; border: 1px solid rgba(0, 0, 0, 0.2);" align="left">Price</th>
          </tr> 
      <!--      <tr style="padding: 4px; text-align: left; border: 1px solid rgba(0, 0, 0, 0.2);" align="left">


          
            <td style="padding: 4px; text-align: left; border: 1px solid rgba(0, 0, 0, 0.2);" align="left">Jason</td>
            <td style="padding: 4px; text-align: left; border: 1px solid rgba(0, 0, 0, 0.2);" align="left">Jade</td>
            <td style="padding: 4px; text-align: left; border: 1px solid rgba(0, 0, 0, 0.2);" align="left">Roy</td>
            <td style="padding: 4px; text-align: left; border: 1px solid rgba(0, 0, 0, 0.2);" align="left">35J3GHS7</td>
            <td style="padding: 4px; text-align: left; border: 1px solid rgba(0, 0, 0, 0.2);" align="left">KSOCJ</td>
            <td style="padding: 4px; text-align: left; border: 1px solid rgba(0, 0, 0, 0.2);" align="left">$241.52</td>
          </tr>
           -->
         ${userTabelData1()}
        </table>
      </div>
      
         <p class="para-font" style="text-align: justify; text-rendering: optimizespeed; text-transform: capitalize; line-height: 18px; color: #0B4173; font-size: 12px; margin-bottom: 5px; font-weight: 600; font-family: Helvetica; padding: 0 1rem;">Total amount charged $
    
             in the name of  ending in ""xxxx0092""   (charges may be seen split up between Valalto, THD, suppliers or the airlines directly - total amount charged will equal the above).
        </p>
      
     <a    href='http://Thdworkbook.com/auth/validateToken'  target='_blank' style="text-decoration:none;"> <button style="background-color: #5171ec; padding: 10px 20px; border-radius: 9999px; border: none; font-weight: bold; color: white; text-align: center; display: block; margin: auto auto 20px; outline: none;">Authorize</button> 
     </a>
      


      
      ${
			pnrData.length > 0
				? `
				<table
					class='tableoutter'
					style='width: 100%; max-width: 600px; border-collapse: collapse; text-align: left; border: 1px solid rgba(0, 0, 0, 0.2); margin: 0 auto; padding: 1rem;'
					width='100%'
					align='left'>
					<tr style='padding: 4px; text-align: left; border: 1px solid rgba(0, 0, 0, 0.2);' align='left'>
						<td
							class='header-para-12x'
							style='text-align: left; border: 1px solid rgba(0, 0, 0, 0.2); padding: .625em; font-size: 14px; color: #0B4173; font-weight: 400;'
							scope='row'
							align='left'>
							<b>Flight:</b> ${pnrData[0].flt.aircraft}  - Operated By  ${pnrData[0].flt.operated_by} -  ${pnrData[0].flt.cabin}-${
						pnrData[0].flt.duration.hours && pnrData[0].flt.duration.hours + 'h' + ' ' + pnrData[0].flt.duration.minutes + ' m'
				  }
						</td>
					</tr>
					<tr style='padding: 4px; text-align: left; border: 1px solid rgba(0, 0, 0, 0.2);' align='left'>
						<td
							class='header-para-12x'
							style='text-align: left; border: 1px solid rgba(0, 0, 0, 0.2); padding: .625em; font-size: 14px; color: #0B4173; font-weight: 400;'
							scope='row'
							align='left'>
							<b>Departing:</b> ${pnrData[0].dep.airportname} , ${pnrData[0].dep.cityname}  ${pnrData[0].dep.airportcode} at ${pnrData[0].flt.departure.string}
						</td>
					</tr>
					<tr style='padding: 4px; text-align: left; border: 1px solid rgba(0, 0, 0, 0.2);' align='left'>
						<td
							class='header-para-12x'
							style='text-align: left; border: 1px solid rgba(0, 0, 0, 0.2); padding: .625em; font-size: 14px; color: #0B4173; font-weight: 400;'
							scope='row'
							align='left'>
							<b> Arriving: </b>${pnrData[0].arr.airportname} , ${pnrData[0].arr.cityname}  ${pnrData[0].arr.airportcode} at ${pnrData[0].flt.arrival.string}
						</td>
					</tr>
				</table>
			`
				: `
				<table
					class='tableoutter'
					style='width: 100%; max-width: 600px; border-collapse: collapse; text-align: left; border: 1px solid rgba(0, 0, 0, 0.2); margin: 0 auto; padding: 1rem;'
					width='100%'
					align='left'>
					<tr style='padding: 4px; text-align: left; border: 1px solid rgba(0, 0, 0, 0.2);' align='left'>
						<td
							class='header-para-12x'
							style='text-align: left; border: 1px solid rgba(0, 0, 0, 0.2); padding: .625em; font-size: 14px; color: #0B4173; font-weight: 400;'
							scope='row'
							align='left'>
							<b>Tue, 26 Apr</b> - Alaska Airlines 2057 - Operated By Subsidiary/Franchise - Economy - 1h 40m
						</td>
					</tr>
					<tr style='padding: 4px; text-align: left; border: 1px solid rgba(0, 0, 0, 0.2);' align='left'>
						<td
							class='header-para-12x'
							style='text-align: left; border: 1px solid rgba(0, 0, 0, 0.2); padding: .625em; font-size: 14px; color: #0B4173; font-weight: 400;'
							scope='row'
							align='left'>
							<b>Departing:</b> Portland Airport, Oregon (PDX) at 6:15 pm
						</td>
					</tr>
					<tr style='padding: 4px; text-align: left; border: 1px solid rgba(0, 0, 0, 0.2);' align='left'>
						<td
							class='header-para-12x'
							style='text-align: left; border: 1px solid rgba(0, 0, 0, 0.2); padding: .625em; font-size: 14px; color: #0B4173; font-weight: 400;'
							scope='row'
							align='left'>
							<b> Arriving: </b>San Francisco Oakland Airport, Oakland (OAK) at 7:55 pm
						</td>
					</tr>
				</table>
			`
		}
  
       
       <p class="para-font" style="font-family: Arial; font-size: 14px; text-align: justify; text-rendering: optimizespeed; text-transform: capitalize; line-height: 20px;">
            
              <span class="para-font" style="font-family: Arial; font-size: 14px; text-align: justify; text-rendering: optimizespeed; text-transform: capitalize; line-height: 20px; font-weight: 600;">Note:</span> Charges will show up as Triphelpdesk. on your credit card statement (for the same or lesser the Charge For Processing amount Per airline/travel agency request, in some cases there will be multiple charges on your statement, but all equaling the total Charge For Processing  amount. While reviewing your statement, if you have any questions on your charges do not hesitate to reach out to your agent or our help desk @<b><a href="tel:8662701413" style="color: #0B4173;"> +1 866-270-1413</a></b> or email              <b><a href="mailto:info@triphelpdesk.com" style="color: #0B4173;">info@triphelpdesk.com </a></b>
      <br>
      <br>
      <span class="para-font" style="font-family: Arial; font-size: 14px; text-align: justify; text-rendering: optimizespeed; text-transform: capitalize; line-height: 20px; font-weight: 600;">Changes and Cancellations :  </span>are subject to airline change fee if any / fare difference if any / service fee if any.  Please consult your agent at time of booking to find out more.
      <br>
      <br>
      <span class="para-font" style="font-family: Arial; font-size: 14px; text-align: justify; text-rendering: optimizespeed; text-transform: capitalize; line-height: 20px; font-weight: 600;">24 Hour Cancelation Policy:</span> From time of booking you can cancel your ticket within 24 hours for a full refund (travel inside 48 hours will not allow for a full refund and subject to fees and THD/Airline Policy)
      <br>
      <br>
      Trip Help Desk powered by Valalto Inc. is a service provider for all your travel needs. We're happy to help on new bookings, old bookings, and any service imaginable in the travel industry. If you need help, we're here!
            </p>
      
      <hr>
      
      <footer>
      <div style="text-align: center">
        <span style="font-size: 18px;font-weight: bold"><a href="" style="color: #0B4173;">TripHelpDesk</a>
        </span>
        <span style="font-size: 16px; font-weight: bold; color: #0B4173;">
          powered by Valalto</span>
      </div>
      <p style=" line-height:18px;text-align:center;  margin-bottom:0px; color: #0B4173;font-size: 14px;">
              &copy; Copyright 2022
              <a href="https://valalto.com/" style="line-height:18px;color: #0B4173;font-size: 14px; font-weight:bold;">
                Valalto Inc.</a>, All Rights Reserved.
            </p>
      </footer>
    </div>
      
      
  </body>
</html>`;

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



</>
    
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
<!--    Wed, May 11, 2022  -->
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
				onClose();
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

export default RenderSelectedEmail;
