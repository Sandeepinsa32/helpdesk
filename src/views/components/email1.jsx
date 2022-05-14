import React, {useState} from 'react';

const Email1 = ({selectedEmailTemplate, Tabledata, pnrData, recordData}) => {
	const [selectedEmail, setSelectedEmail] = useState();
	console.log(selectedEmailTemplate, Tabledata, pnrData, recordData);
	const grandTotal = '100';
	function renderingEmail() {
		switch (selectedEmailTemplate) {
			case 1:
				return <span dangerouslySetInnerHTML={{__html: newBooking}} />;
			case 2:
				return <span dangerouslySetInnerHTML={{__html: Exchange}} />;
			case 3:
				return <span dangerouslySetInnerHTML={{__html: Refund}} />;
			case 4:
				return <span dangerouslySetInnerHTML={{__html: futureCredit}} />;

			default:
				// throw new Error("Unknown step");
				return <span dangerouslySetInnerHTML={{__html: newBooking}} />;
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
		console.log(Tabledata);

		var tableString = '';
		Tabledata.forEach((x) => {
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
		console.log(Tabledata);
		var tableString = '';
		Tabledata.forEach((x) => {
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
		console.log(Tabledata);
		var tableString = '';
		Tabledata.forEach((x) => {
			tableString =
				tableString +
				`<tr>
		  <td >${x.firstName}</td>
		  <td>${x.middleName}</td>
		  <td>${x.lastName}</td>
		  <td>${x.refund}</td>
		</tr>`;
		});

		return tableString;
	}
	function userTabelData4() {
		console.log(Tabledata);
		var tableString = '';
		Tabledata.forEach((x) => {
			console.log(x);
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

	function PnrDetail() {
		var tableString = '';
		pnrData.map((x) => {
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
    
    <div style="width:100%; background:#ffffff; padding:5px 10px; text-align:left;  font-family:"Calibri, sans-serif";">
		
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
      
    </tr>
  </thead>
  <tbody id='appendCHildHere' >
    
  ${userTabelData2()}

   
    
     	
  
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
      <td style="border-right: 1px solid #ddd;"  name="lastname" >$ ${grandTotal}	</td>
       
       
      
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
    
    
		${PnrDetail()}
	
  
  
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
    
    <div style="width:100%;  background:#ffffff; padding:5px 10px; text-align:left;  font-family:"Calibri, sans-serif";">
		
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
    
    
		${userTabelData1()}
	
   
  
  </tbody>
</table>






     
           <div class="paymentMessage" style="background: #efefef;"> 

             <p style="font-size: 12px; line-height: 20px; color: #222; margin-bottom:20px; font-weight: 600;font-family: 'sans-serif';">Total amount charged $ ${grandTotal} in the name of  ending in ""xxxx0092""   (charges may be seen split up between Valalto, THD, suppliers or the airlines directly - total amount charged will equal the above).
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
    
    
		${PnrDetail()}
	
  
  
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
    
    <div style="width:100%; background:#ffffff; padding:5px 10px; text-align:left;  font-family:"Calibri, sans-serif";">
		
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
         ${currentDate()} 
 <!--       Wed, May 11, 2022 -->
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
      <th class="tableHeading" scope="col" name="firstname"> firstname</th>
      <th class="tableHeading" scope="col" name="firstname"> middlename</th>
      <th class="tableHeading" scope="col" name="firstname">lastname</th>
      
       <th scope="col"  class="tableHeading" name="price">Confirmation</th>
      
    </tr>
  </thead>
  <tbody id='appendCHildHere' >
    

    ${userTabelData4()} 

   <!-- 
    <tr>
      <td class="tableHeading" scope="col" name="firstname">Keith Hicks	</td>
      <td class="tableHeading" scope="col" name="lastname" >DJT2JJ</td>
        </tr>
    -->
     	
  
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
      <th class="tableHeading" scope="col" name="firstname"> Name</th>
      
       <th scope="col"  class="tableHeading" name="price">Refund</th>
      
    </tr>
  </thead>
  <tbody id='appendCHildHere' >
    

		${userTabelData3()}

   
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
      
      

     
          
       

          
<!--         <div class="paymentMessage" style="background: #E6F1FC;">  -->

             <p style=" line-height: 18px;  color: #0B4173;font-size: 14px;margin-bottom: 5px; font-weight: 600;font-family:Helvetica;padding: 0 1rem;">
               Trip Help Desk powered by Valalto Inc. is a service provider for all your travel needs. We're happy to help on new bookings, old bookings, and any service imaginable in the travel industry. If you need help, we're here!
        </p>
              
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

	return <>{renderingEmail()}</>;
};

export default Email1;
