import React, {useState} from 'react';

import {Grid, Button} from '@mui/material';
// @mat_icon
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import {BASEURL, successToast} from '../../utils/Utils';
import {emailOpenTag, emailCloseTag, EmailThanksHeader, EmailNoteNCharge, TermNCondition, EmailFooter, EmailAuthBtn, newBookingTableHeading, BaggageFeeQuote} from './email/EmailComponent';
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
  <!-- ./ Static EMail OPen Tag   -->
 ${emailOpenTag}
<!-- ./ small header  -->
 
      ${EmailThanksHeader}
      
      
  
      
      
      
<!--   ./ input field custom table     -->
<tr>
  <td>
      <div class="scrollable-table" style="overflow-x: auto;
  font-family: 'Roboto', sans-serif;;
  max-width: 600px;
  margin: 20px 0px; ">          
<table class="tableoutter-fields-Data-Table" style="border-collapse: collapse;margin: 0;padding: 0;width: 100%;table-layout: fixed;">
  
  
  	${newBookingTableHeading}

  <tbody id="appendCHildHere" style="font-size: 10px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; position: sticky; top: 0; z-index: 1; background: #f5f5f5; ">

    ${newBookingFiledValues()}
    
    </tbody>
</table>
              </div>
    ${BaggageFeeQuote}
  </td>
</tr> 
   
   
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



 <!-- ./ Static EMailCLose Tag   -->
 ${emailCloseTag}
`;

	var Exchange,
		Refund,
		futureCredit = '';
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
