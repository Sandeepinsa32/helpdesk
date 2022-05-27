import React from 'react';
import {TextField, InputAdornment} from '@mui/material';
import {useField, useFormikContext} from 'formik';

const TextfieldWrapper = ({name, currenyField, ...otherProps}) => {
	// const {setFieldValue} = useFormikContext();
	const [field, mata] = useField(name);

	// const handleChange = (evt) => {
	// 	const {value} = evt.target;
	// 	console.log(value);
	// 	setFieldValue(name, value);
	// };

	const InputProps = {
		startAdornment: <InputAdornment position='start'>$</InputAdornment>,
	};

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
	if (currenyField) {
		configTextfield.InputProps = {InputProps};
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
