import React from 'react';

//  import email template
import NewBookingFields from './email/NewBookingFields';
import ExchangeFields from './email/ExchangeFields';
import FutureCreditFields from './email/FutureCreditFields';
import RefundFields from './email/RefundFields';

function RenderEmailField({data}) {
	// de-str props
	const {
		selectedEmailTemplate,
		newBookingFieldList,
		setNewBookingFieldList,
		exchangeFieldList,
		setExchangeFieldList,
		refundFieldList,
		setRefundFieldList,
		futureCreditFieldList,
		setFutureCreditFieldList,
	} = data;

	function SelectedEmailFields() {
		switch (selectedEmailTemplate) {
			case 'newBooking':
				return <NewBookingFields inputList={newBookingFieldList} setInputList={setNewBookingFieldList} />;
			case 'exchange':
				return <ExchangeFields inputList={exchangeFieldList} setInputList={setExchangeFieldList} />;
			case 'refund':
				return <RefundFields inputList={refundFieldList} setInputList={setRefundFieldList} />;
			case 'futureCredit':
				return <FutureCreditFields inputList={futureCreditFieldList} setInputList={setFutureCreditFieldList} />;

			default:
				// throw new Error("Unknown step");
				return <NewBookingFields inputList={newBookingFieldList} setInputList1={setNewBookingFieldList} />;
		}
	}
	return <>{SelectedEmailFields()}</>;
}

export default RenderEmailField;
