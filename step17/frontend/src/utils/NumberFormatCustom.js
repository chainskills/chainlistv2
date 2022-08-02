import React from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
	props,
	ref
) {
	const { onChange, ...other } = props;

	return (
		<NumberFormat
			{...other}
			getInputRef={ref}
			onValueChange={(values) => {
				onChange({
					target: {
						name: props.name,
						value: values.value,
					},
				});
			}}
			defaultValue="0"
			isNumericString
		/>
	);
});

NumberFormatCustom.propTypes = {
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default NumberFormatCustom;