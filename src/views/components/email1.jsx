import React, {useState} from 'react';

const Email1 = ({selectedEmailTemplate, data, pnrData, TotalAmount, noOfPas}) => {
	const [selectedEmail, setSelectedEmail] = useState();
	console.log(data);
	function renderingEmail() {
		switch (selectedEmailTemplate) {
			// case 0:
			// 	return <span dangerouslySetInnerHTML={{__html: newBooking}} />;
			case 1:
				return <span dangerouslySetInnerHTML={{__html: newBooking}} />;
			case 2:
				return <span dangerouslySetInnerHTML={{__html: Exchange}} />;
			case 6:
				return <span dangerouslySetInnerHTML={{__html: futureCredit}} />;
			// case 4:
			// 	return <span dangerouslySetInnerHTML={{__html: newBooking}} />;

			default:
				throw new Error('Unknown step');
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

	function userTabelData(data) {
		var tableString = '';
		data.forEach((x) => {
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
	function PnrDetail(data) {
		// console.log(data);
		var tableString = '';
		data.map((x) => {
			tableString =
				tableString +
				`<tr>
      <td >${new Date(x.flt.departure.string).toLocaleDateString('en-US', {
			day: '2-digit',
			weekday: 'short',
			month: 'short',
			year: '2-digit',
		})}</td>
      <td>${x.flt.operated_by}</td>
      <td> ${new Date(x.flt.departure.string).getHours()}:${new Date(x.flt.departure.string).getMinutes()}</td>
      <td> ${x.dep.airportname},  ${x.dep.airportcode}</td>
      <td> ${new Date(x.flt.arrival.string).getHours()}:${new Date(x.flt.arrival.string).getMinutes() === 0 ? `00` : new Date(x.flt.arrival.string).getMinutes()}</td>
      <td> ${x.arr.airportname}, ${x.arr.airportcode}</td>
      <td>${new Date(x.flt.departure.string).getHours()}H${new Date(x.flt.departure.string).getMinutes()}m </td>
    </tr>`;
		});
		return tableString;
	}
	var Exchange = `<center>
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
                Exchange Request!
            </h1>
            <h1 style="font-size:14px; line-height:22px; font-weight:bold; color:#333333;margin:0;height:fit-content;font-family: 'sans-serif', font-family:"Calibri, sans-serif";">
                Confirmation :
            </h1>
            <h1 style="font-size:14px; line-height:22px; font-weight:bold; color:#333333;margin:0;height:fit-content;font-family: 'sans-serif', font-family:"Calibri, sans-serif";">
               THDFRN2203011
            </h1>
	    </div>
		
		
		 <h1 style="font-size:14px; line-height:22px; font-weight:bold; color:#333333;margin:0;height:fit-content;font-family: 'sans-serif', font-family:"Calibri, sans-serif"; ">
       ${currentDate()}
  <!--        Wed, May 11, 2022  -->
        </h1>
		<h1 style="font-size:14px; line-height:22px; font-weight:600; color:#333333;font-family: 'sans-serif', font-family:"Calibri, sans-serif"; ">
      Requested Service: 		Exchange
        </h1>
      
      
      <p style="font-size:12px; line-height:18px; color:#666666; margin-bottom:30px; font-family: 'sans-serif', font-family:"Calibri, sans-serif";">
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
       <th scope="col"  class="tableHeading" name="price">other</th>
      
    </tr>
  </thead>
  <tbody id='appendCHildHere' >
    
  ${userTabelData(data)}

   
    
     	
  
  </tbody>
</table>

      <div class="paymentMessage" style="background: #efefef;"> 

             <p style="font-size: 12px;text-align:end; line-height: 20px; color: #222; margin-bottom:20px; font-weight: 600;font-family: 'sans-serif';">* Baggage Fee May Apply . Check with Airlines for the Most Updated Baggage Rule.
        </p>
              
            </div>
      
     
      



               <table class="tableoutter" style="margin-top:1rem;display: inline-block;border: 0; ">
  
    

   
    <tr>
      <td style="border-right: 1px solid #ddd;"   name="firstname">Airline : 	</td>
      <td  style="border-right: 1px solid #ddd; width:100px"  name="lastname" ></td>
       
       
      
    </tr>
          <tr>
      <td style="border-right: 1px solid #ddd;" name="firstname">Credit :	</td>
      <td style="border-right: 1px solid #ddd;"  name="lastname" >$ ${TotalAmount}	</td>
       
       
      
    </tr>  <tr>
      <td style="border-right: 1px solid #ddd;"  name="firstname">Valid Till :	</td>
      <td style="border-right: 1px solid #ddd;"  name="lastname" ></td>
       
       
      
    </tr>
     	
 
</table>


     
          
       
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
  
  <thead class=" tableHead ">
    <tr>
      <th class="tableHeading" scope="col" name="date">Date</th>
      <th class="tableHeading" scope="col" name="airline" >Airline</th>
      <th class="tableHeading" scope="col" name="depart">Depart </th>
      <th scope="col"  class="tableHeading" name="depart-from" >From</th>
      <th scope="col"  class="tableHeading" name="arrive">Arrive</th>
      <th scope="col" class="tableHeading"  name="arrive-at">At </th>
      <th scope="col"  class="tableHeading" name="duration" >Duration</th>
      
    </tr>
  </thead>
  <tbody >
    
    
		${PnrDetail(pnrData)}
	
  
  
  </tbody>
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

	var newBooking = `  <center>
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
      <th class="tableHeading" scope="col" name="middlename" >Middle Name</th>
      <th class="tableHeading" scope="col" name="lastname" >Last Name</th>
      <th  class="tableHeading" scope="col" name="Ticket">Ticket </th>
      <th scope="col"  class="tableHeading" name="confirmation" >Confirmation</th>
      <th scope="col"  class="tableHeading" name="price">Price</th>
      
    </tr>
  </thead>
  <tbody id='appendCHildHere' >
    
    
		${userTabelData(data)}
	
   
  
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
  
  <thead class=" tableHead ">
    <tr>
      <th class="tableHeading" scope="col" name="date">Date</th>
      <th class="tableHeading" scope="col" name="airline" >Airline</th>
      <th class="tableHeading" scope="col" name="depart">Depart </th>
      <th scope="col"  class="tableHeading" name="depart-from" >From</th>
      <th scope="col"  class="tableHeading" name="arrive">Arrive</th>
      <th scope="col" class="tableHeading"  name="arrive-at">At </th>
      <th scope="col"  class="tableHeading" name="duration" >Duration</th>
      
    </tr>
  </thead>
  <tbody >
    
    
		${PnrDetail(pnrData)}
	
  
  
  </tbody>
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

	var futureCredit = `<center>
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
                Invoice
            </h1>
            <h1 style="font-size:14px; line-height:22px; font-weight:bold; color:#333333;margin:0;height:fit-content;font-family: 'sans-serif', font-family:"Calibri, sans-serif";">
                Confirmation :
            </h1>
            <h1 style="font-size:14px; line-height:22px; font-weight:bold; color:#333333;margin:0;height:fit-content;font-family: 'sans-serif', font-family:"Calibri, sans-serif";">
               THDFRN2203011
            </h1>
	    </div>
		
		
		 <h1 style="font-size:14px; line-height:22px; font-weight:bold; color:#333333;margin:0;height:fit-content;font-family: 'sans-serif', font-family:"Calibri, sans-serif"; ">
<!--         ${currentDate()} -->
        Wed, May 11, 2022 
        </h1>
		<h1 style="font-size:14px; line-height:22px; font-weight:600; color:#333333;font-family: 'sans-serif', font-family:"Calibri, sans-serif"; ">
   Requested Service: Cancellation of Airline Ticket For Credi
        </h1>
      
      
      <p style="font-size:12px; line-height:18px; color:#666666; margin-bottom:30px; font-family: 'sans-serif', font-family:"Calibri, sans-serif";">
       "Your cancelation for future credit is in process and will be submitted to the airlines to finalize. Once completed, you'll have a credit with the airlines for the amount. (credit and rebooking fees are subject to the ailrine policy). You can contact us or the airlines directly when it's time to use your airline credit - Trip Help Desk is more than happy to help!
		  If you need any assistance regarding changes, please contact us at <b> +1 866-270-1413</b>  or email at <b>info@triphelpdesk.com</b>
      </p>
      

    
<table class="tableoutter">
  
  <thead class=" tableHead ">
    <tr>
      <th class="tableHeading" scope="col" name="firstname"> Passenger(s)</th>
      
       <th scope="col"  class="tableHeading" name="price">Confirmation</th>
      
    </tr>
  </thead>
  <tbody id='appendCHildHere' >
    

		userTabelData();

   
    <tr>
      <td class="tableHeading" scope="col" name="firstname">Keith Hicks	</td>
      <td class="tableHeading" scope="col" name="lastname" >DJT2JJ</td>
       
       
      
    </tr>
     	
  
  </tbody>
</table>

      
      
      <table class="tableoutter" style="margin-top:1rem;display: inline-block;border: 0; ">
  
    

   
    <tr>
      <td style="border-right: 1px solid #ddd;"   name="firstname">Airline : 	</td>
      <td  style="border-right: 1px solid #ddd; width:100px"  name="lastname" ></td>
       
       
      
    </tr>
          <tr>
      <td style="border-right: 1px solid #ddd;" name="firstname">Credit :	</td>
      <td style="border-right: 1px solid #ddd;"  name="lastname" >$	</td>
       
       
      
    </tr>  <tr>
      <td style="border-right: 1px solid #ddd;"  name="firstname">Valid Till :	</td>
      <td style="border-right: 1px solid #ddd;"  name="lastname" ></td>
       
       
      
    </tr>
     	
 
</table>
      
      

     
          
       

          
      
      <div>
      <p style="font-size:9px; line-height:11px; color:#666666; margin-bottom:10px;">
       
Note: Charges will show up as Triphelpdesk. on your credit card statement (for the same or lesser the ""Charge For Processing '' amount. . Per airline/travel agency request, in some cases there will be multiple charges on your statement, but all equaling the total ""Charge For Processing '' amount. While reviewing your statement, if you have any questions on your charges do not hesitate to reach out to your agent or our help desk @ 866-270-1413 or email info@triphelpdesk.com 

Changes and Cancellations are subject to airline change fee if any / fare difference if any / service fee if any.  Please consult your agent at time of booking to find out more. 

24 Hour Cancelation Policy: From time of booking you can cancel your ticket within 24 hours for a full refund (travel inside 48 hours will not allow for a full refund and subject to fees and THD/Airline Policy)

Trip Help Desk powered by Valalto Inc. is a service provider for all your travel needs. We're happy to help on new bookings, old bookings, and any service imaginable in the travel industry. If you need help, we're here!
      </p>
      
       </div>


       <div>
         
         
         

      <div class="paymentMessage" style="background: #efefef;"> 

             <p style="font-size: 12px; line-height: 20px; color: #222; margin-bottom:20px; font-weight: 600;font-family: 'sans-serif';">
               Trip Help Desk powered by Valalto Inc. is a service provider for all your travel needs. We're happy to help on new bookings, old bookings, and any service imaginable in the travel industry. If you need help, we're here!
        </p>
              
            </div>
        
       
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

	return <>{renderingEmail()}</>;
};

export default Email1;
