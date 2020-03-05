import React, { useState } from 'react';

function Input(props) {
	function handleChange(event) {
		const { name, value } = event.target;
		props.onChange(name, value);
	}

	return (
		<input
			type="text"
			name={props.nam}
			value={props.val}
			onChange={handleChange}
		/>
	)
}

export default Input;