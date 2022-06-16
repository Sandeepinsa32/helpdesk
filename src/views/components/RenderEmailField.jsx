import React from 'react';
import {Box} from '@mui/material';

//  import email template
import NewBookingFields from './email/NewBookingFields';
import ExchangeFields from './email/ExchangeFields';
import FutureCreditFields from './email/FutureCreditFields';
import RefundFields from './email/RefundFields';

function RenderEmailField({data}) {
	// de-str props
	const {selectedEmailTemplate, Ticketid, pnrData, onClose, inputList1, setInputList1, inputList2, setInputList2, inputList3, setInputList3, inputList4, setInputList4} = data;

	function SelectedEmailFields() {
		switch (selectedEmailTemplate) {
			case 'newBooking':
				return <NewBookingFields inputList={inputList1} setInputList={setInputList1} />;
			case 'exchange':
				return <ExchangeFields inputList={inputList2} setInputList={setInputList2} />;
			case 'refund':
				return <RefundFields inputList={inputList3} setInputList={setInputList3} />;
			case 'futureCredit':
				return <FutureCreditFields inputList={inputList4} setInputList={setInputList4} />;

			default:
				// throw new Error("Unknown step");
				return <NewBookingFields setInputList1={setInputList1} />;
		}
	}
	return <Box sx={{mt: 2, p: 1}}>{SelectedEmailFields()}</Box>;
}

export default RenderEmailField;
