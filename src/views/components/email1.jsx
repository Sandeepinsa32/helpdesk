import React from 'react';

const Email1 = ({selectedEmailTemplate, name, bookingDate, TotalAmount, noOfPas}) => {
	var html = `  <center>
		
    
    <div style="width:100%; max-width:600px; background:#ffffff; padding:5px 10px; text-align:left; font-family: 'sans-serif', font-family:"Calibri, sans-serif"; sans-serif;">
		
      <p style="font-size:12px; line-height:24px; color:#666666; margin-bottom:10px;">
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
        Mon, May 2, 2022
        ${bookingDate}
        </h1>
		<h1 style="font-size:14px; line-height:22px; font-weight:normal; color:#333333;font-family: 'sans-serif', font-family:"Calibri, sans-serif"; ">
        Dear ${name},
        </h1>
      
      
      <p style="font-size:16px; line-height:24px; color:#666666; margin-bottom:30px; font-family: 'sans-serif', font-family:"Calibri, sans-serif";">
       Thank you for choosing Triphelpdesk for your travel arrangements. We truly appreciate your business.
        As per our conversation and agreed, we have processed your reservation under the confirmation code 
        Your flight is now booked and is in process. Please note that you will receive the E-Ticket confirmation shortly in a separate email once the process is finalized.
		  If you need any assistance regarding changes, please contact us at <b> +1 866-270-1413</b>  or email at <b>info@triphelpdesk.com</b>
      </p>
      
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td>
            <table border="0" cellspacing="0" cellpadding="0">
              <tr>
             <p> Name is : ${name}</p>
             <p> Total Number of passengers : ${noOfPas}</p>
             <p> selected Email Template : ${selectedEmailTemplate}</p>
             <p> Booking Date: ${bookingDate}</p>
             <p> Total Amount is : ${TotalAmount}</p>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td width="100%" height="30">&nbsp;</td>
        </tr>
      </table>
      
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
