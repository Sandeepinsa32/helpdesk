import React, {useState} from 'react';

import {Grid, Button} from '@mui/material';
// @mat_icon
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import {BASEURL, successToast} from '../../utils/Utils';
import {EmailHeader, EmailThanksHeader, EmailNoteNCharge, TermNCondition, EmailFooter, EmailAuthBtn} from './email/EmailComponent';
const RenderSelectedEmail = ({data, values, setLoader}) => {
	const {
		selectedEmailTemplate,
		Ticketid,
		pnrData,
		onClose,
		newBookingFieldList,
		setNewBookingFieldList,
		exchangeFieldList,
		setExchangeFieldList,
		refundFieldList,
		setRefundFieldList,
		futureCreditFieldList,
		setFutureCreditFieldList,
		userData,
		formik,
		selectedCurrency,
	} = data;
	const {email, name, ccLastDigit, totalAmount} = values;
	const {submitForm} = formik;

	const [isPreviewed, setIsPreviewed] = useState(true);

	// For Displaying Selected EMail  ---Dangersly setting HTML
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
			default:
				return <span dangerouslySetInnerHTML={{__html: newBooking}} />;
		}
	}
	//  for get variable ref. of selected email HTML
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

	function newBookingFiledValues() {
		var tableString = '';
		newBookingFieldList.forEach((x) => {
			const isEmpty = Object.values(x).every((obj) => obj === null || obj === '');

			if (isEmpty) {
				return;
			}

			tableString =
				tableString +
				`<tr style="background-color: #f8f8f8;padding: 0.35em;text-align:center;border: 1px solid #fff !important;">
	   <td style=" padding: 18px 24px;font-size:14px;color:#0B4173;font-weight:400;" class="tableHeading" scope="col" >${x.firstName}</td>
		  <td style=" padding: 18px 24px;font-size:14px;color:#0B4173;font-weight:400;" class="tableHeading" scope="col" >${x.middleName}</td>
		  <td style=" padding: 18px 24px;font-size:14px;color:#0B4173;font-weight:400;" class="tableHeading" scope="col" >${x.lastName}</td>
		  <td style=" padding: 18px 24px;font-size:14px;color:#0B4173;font-weight:400;" class="tableHeading" scope="col" >${x.ticket}</td>
		  <td style=" padding: 18px 24px;font-size:14px;color:#0B4173;font-weight:400;" class="tableHeading" scope="col" >${x.confirmation}</td>
      
		  <td style=" padding: 18px 24px;font-size:14px;color:#0B4173;font-weight:400;" class="tableHeading" scope="col" >${x.dob}</td>
		  <td style=" padding: 18px 24px;font-size:14px;color:#0B4173;font-weight:400;" class="tableHeading" scope="col" >${selectedCurrency} ${x.price && x.price + '.00'}</td>
		</tr>`;
		});

		return tableString;
	}
	function newExchangeFieldValues() {
		var tableString = '';
		exchangeFieldList.forEach((x) => {
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
	function newRefundFieldValues() {
		var tableString = '';
		refundFieldList.forEach((x) => {
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
	function newFutureCreditFieldValues() {
		var tableString = '';
		futureCreditFieldList.forEach((x) => {
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
	const handleSendEmail = async () => {
		setLoader(true);
		axios
			.post(BASEURL + '/ticket/email', {
				data: getSelectedEmail(),
				ticketId: Ticketid,
				email,
			})
			.then((res) => {
				console.log(res);
				successToast('Email sent Successfully');
				setLoader(false);
				onClose();
			})
			.catch((e) => {
				console.log(e);
				setLoader(false);
			});
	};

	var newBooking = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap" rel="stylesheet">
<div style="background-color:#ffffff;margin:0;padding:0;font-family: 'Roboto', sans-serif;">
<!-- ./ outter div   -->
    
  <table width="100%" bgcolor="#fff" border="0" cellpadding="0" cellspacing="0">
  
	<tbody>
    <tr>
<!--  ./ whole code in this td      --> 
		<td align="center" style="padding:15px">
      
<!-- ./ OUTTER TABLE'S TABLE DATA       -->
      
		<table bgcolor="#ffffff" width="600" align="center" cellpadding="0" cellspacing="0" border="0" style="max-width:100%">
		<tbody>

      
<!-- ./ header  -->
    ${EmailHeader}
      
      <!--  ./Booking code && date     -->
<tr><td>       
  
  
  <table width="100%" align="center" cellpadding="6" cellspacing="0" border="0">
				<tbody>
          <tr>
					<td align="left">
					  <p>
            <span style="padding-bottom:0;padding-right:0;padding-left:0;font-family: 'Roboto', sans-serif;color:#000;font-size:16px;line-height:24px;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;mso-table-lspace:0pt;mso-table-rspace:0pt;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;color:#000;text-decoration:none;float:left; ">Booking Code :</span>
            <span style="padding-bottom:0;padding-right:0;padding-left:0;font-family: 'Roboto', sans-serif; color:#5171ec;font-size:16px;line-height:24px;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;mso-table-lspace:0pt;mso-table-rspace:0pt;  font-family: 'Roboto', sans-serif;; float:left;">THD457S58</span>
          </p>
					</td>
          <td align="right">
					  <p><span style="padding-bottom:0;padding-right:0;padding-left:0;font-family: 'Roboto', sans-serif;color:#555555;font-size:16px;line-height:24px;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;color:#000;text-decoration:none;width:100%;text-align:right; ">May 12, 2022 </span></p>
					</td>
				</tr>
			</tbody></table>
        
        
        </td></tr> 
<!-- ./ small header  -->
 
      ${EmailThanksHeader}
      
      
  
      
      
      
<!--   ./ input field custom table     -->
 <tr><td>
             <div class="scrollable-table" style="overflow-x: auto;
  font-family: 'Roboto', sans-serif;;
  max-width: 600px;
  margin: 20px 0px; ">          
<table class="tableoutter-fields-Data-Table" style="border-collapse: collapse;margin: 0;padding: 0;width: 100%;table-layout: fixed;">
  
  
  		<thead style="font-size: 10px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; position: sticky; top: 0; z-index: 1; background: #f5f5f5; ">
			<tr>
				<th style="padding: 18px 24px; white-space: nowrap; ">First Name</th>
				<th style="padding: 18px 24px; white-space: nowrap; ">Middle Name</th>
				<th style="padding: 18px 24px; white-space: nowrap; ">Last Name</th>
				<th style="padding: 18px 24px; white-space: nowrap; ">Ticket</th>
				<th style="padding: 18px 24px; white-space: nowrap; ">Confirmation</th>
				<th style="padding: 18px 24px; white-space: nowrap; ">DoB</th>
        	<th style="padding: 18px 24px; white-space: nowrap; ">Price</th>
				
			</tr>
		</thead>

  <tbody id="appendCHildHere" style="font-size: 10px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; position: sticky; top: 0; z-index: 1; background: #f5f5f5; ">

    ${newBookingFiledValues()}
    
    </tbody>
</table>

               
              </div>
   
    <p style="  color: #0B4173;font-size: 12px;margin: 0px; font-weight: 600;font-family: 'Roboto', sans-serif;padding: 0;text-align:center;">
   * Baggage Fee May Apply . Check with Airlines for the Most Updated Baggage Rule.
   </p> </td></tr> 
   
   
<!--    ./ card details    -->
      <tr> 
        <td>
             <table class="tableoutter" align="right" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #ccc;margin:1rem;border-radius:10px;">
  
 
       <tr>
         <td class="header-para-12x" style=" padding: .625em;font-size:14px;color:#0B4173;font-weight:600;" scope="row">
        Total Amount Charged :   
         </td>
          <td class="header-para-12x" style=" padding: .625em;font-size:14px;color:#0B4173;font-weight:400;" scope="row">
          <b> ${selectedCurrency} ${totalAmount && totalAmount + '.00'} </b>
         </td>
        </tr>
        <tr>
           <td class="header-para-12x" style=" padding: .625em;font-size:14px;color:#0B4173;font-weight:600;" scope="row">
      Name Of Card Holder:  
       </td>
           <td class="header-para-12x" style=" padding: .625em;font-size:14px;color:#0B4173;font-weight:400;" scope="row">
      <b> ${name}</b> 
       </td>
         </tr>
         <tr>
            <td class="header-para-12x" style=" padding: .625em;font-size:14px;color:#0B4173;font-weight:600;" scope="row">
         Card Detail :
           </td>
                <td class="header-para-12x" style=" padding: .625em;font-size:14px;color:#0B4173;font-weight:400;" scope="row">
     xxxx- <b>${ccLastDigit} </b> 
            </td>
         </tr>
      </table>
      </td></tr>


<!--   ./ auth btn      -->      
      ${EmailAuthBtn}   
<!--   ./ pnr table     -->
      <tr><td>
               
         <table class="tableoutter" style="margin: 0 auto;padding:1rem;">
   ${
		pnrData !== null && pnrData !== undefined && pnrData !== [] && pnrData.length > 0
			? pnrData.map(
					(row, index) =>
						`
              <tr>
		  <td class="header-para-12x" style=" padding: .625em;font-size:14px;color:#0B4173;font-weight:400;" scope="row">

			<b>Tue, 26 Apr </b> Operated By ${row.flt.operated_by}-${row.flt.duration.hours && row.flt.duration.hours + 'h' + ' ' + row.flt.duration.minutes + ' m'}
		</td>
	</tr>
	 <tr>
           <td class="header-para-12x" style=" padding: .625em;font-size:14px;color:#0B4173;font-weight:400;" scope="row">
			<b>Departing:</b> ${row.dep.airportname} , ${row.dep.cityname} ${row.dep.airportcode} at ${row.flt.departure.string}
		</td>
	</tr>
	 <tr>
           <td class="header-para-12x" style=" padding: .625em;font-size:14px;color:#0B4173;font-weight:400;" scope="row">
			<b> Arriving: </b>${row.arr.airportname} , ${row.arr.cityname} ${row.arr.airportcode} at ${row.flt.arrival.string}
	<hr/>	</td>
      
	</tr> 
  `
			  )
			: `
				<table
					class='tableoutter'
					style='width: 100%; max-width: 600px; border-collapse: collapse; text-align: left; border: 1px solid rgba(0, 0, 0, 0.2); margin: 0 auto; padding: 1rem;'
					width='100%'
					align='left'>
					<tr style='padding: 4px; text-align: left; border: 1px solid rgba(0, 0, 0, 0.2);' align='left'>
						<td
							class='header-para-12x'
							style='text-align: center; border: 1px solid rgba(0, 0, 0, 0.2); padding: .625em; font-size: 14px; color: #0B4173;;text-transform:capitalize; font-weight: 400;'
							scope='row'
							align='left'  >
				       itinerary goes here, please  add pnr for preview
						</td>
					</tr>
					
				</table>
        <br/>
        <br/>
			`
   }

      </td></tr>

      

<!-- ./ Note & charges part  -->
${EmailNoteNCharge}


<!--  ./Term & conditions  -->
 
${TermNCondition}

<!--  ./footer   -->
${EmailFooter}






</td></tr>
</tbody></table>
      
      
      
      




      
		</td>
	</tr>
</tbody></table></div></link></link></link>`;

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
    

    ${newExchangeFieldValues()}
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
    

		${newRefundFieldValues()}

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
    
      ${newFutureCreditFieldValues()}
   
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

	return (
		<>
			{renderingEmail()}

			<Grid container spacing={1} sx={{m: 0, p: 1}}>
				<Grid item xs={6} md={10}></Grid>

				<Grid item xs={6} md={2} sx={{mb: 3}}>
					<Button
						onClick={() => {
							submitForm();
							handleSendEmail();
						}}
						variant='contained'
						endIcon={<SendIcon />}>
						Send Mail
					</Button>
				</Grid>
			</Grid>
		</>
	);
};

export default RenderSelectedEmail;
