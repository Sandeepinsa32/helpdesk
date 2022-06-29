import React from 'react';

//  import email template
import NewBookingFields from './email/NewBookingFields';
import ExchangeFields from './email/ExchangeFields';
import FutureCreditFields from './email/FutureCreditFields';
import RefundFields from './email/RefundFields';
import PetFields from './email/PetFields';
import SeatFields from './email/SeatFields';

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
		petFieldList,
		setPetFieldList,
		seatFieldList,
		setSeatFieldList,
		selectedCurrency,
	} = data;

	function SelectedEmailFields() {
		switch (selectedEmailTemplate) {
			case 'newBooking':
				return <NewBookingFields inputList={newBookingFieldList} setInputList={setNewBookingFieldList} data={data} />;
			case 'exchange':
				return <ExchangeFields inputList={exchangeFieldList} setInputList={setExchangeFieldList} data={data} />;
			case 'refund':
				return <RefundFields inputList={refundFieldList} setInputList={setRefundFieldList} data={data} />;
			case 'futureCredit':
				return <FutureCreditFields inputList={futureCreditFieldList} setInputList={setFutureCreditFieldList} data={data} />;
			case 'pet':
				return <PetFields inputList={petFieldList} setInputList={setPetFieldList} data={data} />;
			case 'seat':
				return <SeatFields inputList={seatFieldList} setInputList={setSeatFieldList} data={data} />;

			default:
				// throw new Error("Unknown step");
				return <NewBookingFields inputList={newBookingFieldList} setInputList1={setNewBookingFieldList} />;
		}
	}
	return <>{SelectedEmailFields()}</>;
}

export default RenderEmailField;
