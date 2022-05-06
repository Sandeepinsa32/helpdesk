import React from 'react';

const Email1 = ({selectedEmailTemplate, data, bookingDate, TotalAmount, noOfPas}) => {
	function currentDate() {
		let today = new Date();
		let dd = String(today.getDate()).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		let yyyy = today.getFullYear();

		today = mm + '/' + dd + '/' + yyyy;
		return today;
	}

	function userTabelData() {
		var tr, td, node, rootNode;
		// console.log(data);
		data.map((x, i) => {
			// console.log(x, i);
			tr = document.createElement('tr');
			for (var obj in x) {
				td = document.createElement('td');
				node = document.createTextNode(data[i][obj]);
				td.appendChild(node);
				tr.appendChild(td);
				rootNode = document.getElementById('appendCHildHere');
				rootNode.appendChild(tr);
			}
		});
	}

	var html = `  <center>
		<style>
    table.tableoutter {
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
}



table.tableoutter tr {
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  padding: .35em;
}

table.tableoutter th,
table.tableoutter td {
  padding: .625em;
  font-size:12px;

}

table.tableoutter th {
  font-size: 10px;
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
    
    <div style="width:100%; max-width:600px; background:#ffffff; padding:5px 10px; text-align:left;  font-family:"Calibri, sans-serif";">
		
      <p style="font-size:12px; line-height:24px; color:#666666; margin-bottom:10px;  font-family:"Calibri, sans-serif";">
        By approving via email you are agreeing to the terms of invoice and authorize Trip Help Desk powered by Valalto to complete your "Requested Service".  Your authorization is for the use of this invoice and for no other purpose. 
      </p>
      
		<hr/>
		  <h1 style="font-size:14px; text-align:right; line-height:22px; font-weight:normal; color:#333333; font-family: 'sans-serif', font-family:"Calibri, sans-serif";">
			  Trip Help Desk Powered By <b>Valalto Inc.</b>	
         </h1>
          
		<div style="display:flex;justify-content:space-between;">
		
  
            <h1 style="font-size:14px; line-height:22px; font-weight:bold; color:#333333;margin:0;height:fit-content;font-family: 'sans-serif', font-family:"Calibri, sans-serif"; ">
                New Booking	
            </h1>
            <h1 style="font-size:14px; line-height:22px; font-weight:bold; color:#333333;margin:0;height:fit-content;font-family: 'sans-serif', font-family:"Calibri, sans-serif";">
                Confirmation 
            </h1>
            <h1 style="font-size:14px; line-height:22px; font-weight:bold; color:#333333;margin:0;height:fit-content;font-family: 'sans-serif', font-family:"Calibri, sans-serif";">
                KFQHMW
            </h1>
	    </div>
		
		
		 <h1 style="font-size:14px; line-height:22px; font-weight:bold; color:#333333;margin:0;height:fit-content;font-family: 'sans-serif', font-family:"Calibri, sans-serif"; ">
        ${currentDate()}
        </h1>
		<h1 style="font-size:14px; line-height:22px; font-weight:normal; color:#333333;font-family: 'sans-serif', font-family:"Calibri, sans-serif"; ">
        Dear Customer	,
        </h1>
      
      
      <p style="font-size:12px; line-height:18px; color:#666666; margin-bottom:30px; font-family: 'sans-serif', font-family:"Calibri, sans-serif";">
       Thank you for choosing Triphelpdesk for your travel arrangements. We truly appreciate your business.
        As per our conversation and agreed, we have processed your reservation under the confirmation code 
        Your flight is now booked and is in process. Please note that you will receive the E-Ticket confirmation shortly in a separate email once the process is finalized.
		  If you need any assistance regarding changes, please contact us at <b> +1 866-270-1413</b>  or email at <b>info@triphelpdesk.com</b>
      </p>
      

    
<table class="tableoutter">
  
  <thead class=" tableHead ">
    <tr>
      <th class="tableHeading" scope="col" name="firstname">First Name</th>
      <th class="tableHeading" scope="col" name="lastname" >Last Name</th>
      <th  class="tableHeading" scope="col" name="Ticket">Ticket </th>
      <th scope="col"  class="tableHeading" name="confirmation" >Confirmation</th>
       <th scope="col"  class="tableHeading" name="price">Price</th>
      
    </tr>
  </thead>
  <tbody id='appendCHildHere' >
    
    ${setTimeout(() => {
		userTabelData();
	}, 2000)}
   
  
  </tbody>
</table>






     
           <div class="paymentMessage" style="background: #efefef;"> 

             <p style="font-size: 12px; line-height: 20px; color: #222; margin-bottom:20px; font-weight: 600;font-family: 'sans-serif';">Total amount charged $ ${TotalAmount} in the name of  ending in ""xxxx0092""   (charges may be seen split up between Valalto, THD, suppliers or the airlines directly - total amount charged will equal the above).
        </p>
              
            </div>
       
 <div>
          
      
      
      <p style="font-size:9px; line-height:11px; color:#666666; margin-bottom:10px;">
       
Note: Charges will show up as Triphelpdesk. on your credit card statement (for the same or lesser the ""Charge For Processing '' amount. . Per airline/travel agency request, in some cases there will be multiple charges on your statement, but all equaling the total ""Charge For Processing '' amount. While reviewing your statement, if you have any questions on your charges do not hesitate to reach out to your agent or our help desk @ 866-270-1413 or email info@triphelpdesk.com 

Changes and Cancellations are subject to airline change fee if any / fare difference if any / service fee if any.  Please consult your agent at time of booking to find out more. 

24 Hour Cancelation Policy: From time of booking you can cancel your ticket within 24 hours for a full refund (travel inside 48 hours will not allow for a full refund and subject to fees and THD/Airline Policy)

Trip Help Desk powered by Valalto Inc. is a service provider for all your travel needs. We're happy to help on new bookings, old bookings, and any service imaginable in the travel industry. If you need help, we're here!
      </p>
      
       </div>


       <div>
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
        
       
       </div>











      <hr style="border:none; height:1px; color:#dddddd; background:#dddddd; width:100%; margin-bottom:20px;">
      
      <p style="font-size:12px; line-height:18px; color:#999999; margin-bottom:10px;">
        &copy; Copyright 2018 
        <a href="http://glennsmith.me" 
           style="font-size:12px; line-height:18px; color:#666666; font-weight:bold;">
          Valalto Inc.</a>, All Rights Reserved.
      </p>
      
     
      
    </div>
      
    </center >`;
	return <span dangerouslySetInnerHTML={{__html: html}} />;
};

export default Email1;
