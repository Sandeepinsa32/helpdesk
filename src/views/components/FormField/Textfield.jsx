import React from 'react';
import {TextField, InputAdornment} from '@mui/material';
import {useField, useFormikContext} from 'formik';

const TextfieldWrapper = ({name, currenyField, ...otherProps}) => {
	// const {setFieldValue} = useFormikContext();

	// const handleChange = (evt) => {
	// 	const {value} = evt.target;
	// 	console.log(value);
	// 	setFieldValue(name, value);
	// };
	const [field, mata] = useField(name);

	const configTextfield = {
		...field,
		...otherProps,
		fullWidth: true,
		autoComplete: 'off',
		variant: 'outlined',
	};

	if (mata && mata.touched && mata.error) {
		configTextfield.error = true;
		configTextfield.helperText = mata.error;
	}

	return <TextField {...configTextfield} />;
};

export default TextfieldWrapper;
