import React, { useState } from "react";

//import { validate } from "../../../../shared/validators";
import classes from "./Input.module.scss";
import PassToggle from "./PassToggle/PassToggle";

const Input = ({
	elementType,
	id,
	type,
	label,
	errorText,
	rows,
	onChange,
	validators,
	externalStyles,
	placeholder,
	value,
	initialValue,
	initialValid,
	required,
}) => {
	const [visible, setVisible] = useState(false);
	//const changeHandler = (event) => {};

	const clsInput = [classes.Input, externalStyles];
	const clsLabel = [];

	if (value) {
		clsLabel.push(classes.active);
	}

	let element = (
		<input
			id={id}
			type={type}
			onChange={onChange}
			//onBlur={touchHandler}
			placeholder={placeholder}
			value={value}
			required={required}
		/>
	);

	if (elementType === "password") {
		element = (
			<input
				id={id}
				type={visible ? "text" : type}
				onChange={onChange}
				//onBlur={touchHandler}
				placeholder={placeholder}
				value={value}
				required={required}
			/>
		);
	}

	if (elementType === "textarea") {
		element = (
			<textarea
				id={id}
				rows={rows || 3}
				onChange={onChange}
				//onBlur={touchHandler}
				value={value}
			/>
		);
	}

	return (
		<div
			//className={`form-control ${
			//	!inputState.isValid && inputState.isTouched && "form-control--invalid"
			//}`}

			className={clsInput.join(" ")}
		>
			{elementType === "password" && (
				<PassToggle
					isView={visible}
					onToggle={() => setVisible((prevState) => !prevState)}
				/>
			)}
			{element}
			<label className={clsLabel} htmlFor={id}>
				{label}
			</label>
			{/*{!inputState.isValid && inputState.isTouched && (
				<p>{props.errorText}</p>
			)}*/}
		</div>
	);
};

export default Input;
