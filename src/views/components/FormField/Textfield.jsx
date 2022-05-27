import React from 'react';
import {TextField} from '@mui/material';
import {useField, useFormikContext} from 'formik';

const TextfieldWrapper = ({name, ...otherProps}) => {
	// const {setFieldValue} = useFormikContext();
	const [field, mata] = useField(name);

	// const handleChange = (evt) => {
	// 	const {value} = evt.target;
	// 	console.log(value);
	// 	setFieldValue(name, value);
	// };
	const configTextfield = {
		...field,
		...otherProps,
		fullWidth: true,
		variant: 'outlined',
	};

	if (mata && mata.touched && mata.error) {
		configTextfield.error = true;
		configTextfield.helperText = mata.error;
	}

	return <TextField {...configTextfield} />;
};

export default TextfieldWrapper;

{
	/* <TextField
	fullWidth
	disabled={isView}
	label='FIRST NAME'
	name='firstName'
	error={Boolean(formik.touched.firstName && formik.errors.firstName)}
	helperText={formik.touched.firstName && formik.errors.firstName}
	onBlur={formik.handleBlur}
	onChange={formik.handleChange}
	value={formik.values.firstName}
/>; */
}
