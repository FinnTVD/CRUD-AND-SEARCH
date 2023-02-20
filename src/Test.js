import React from "react";
import { useFormik } from "formik";

const validate = (values) => {
	const errors = {};
	if (!values.name) errors.name = "Invalid";
	return errors;
};
const Test = () => {
	const formik = useFormik({
		initialValues: {
			name: "",
		},
		validate,
		onSubmit: (values) => console.log(values),
	});
	return (
		<>
			<form onSubmit={formik.handleSubmit}>
				<label htmlFor="name">
					FirstName
					<input
						type="text"
						name="name"
						id="name"
						placeholder="Name enter..."
						autoFocus
						value={formik.values.name}
						onChange={formik.handleChange}
					/>
				</label>
				{formik.errors.name ? (
					<div className="text-[#921d1d]">{formik.errors.name}</div>
				) : null}
				<button type="submit">Submit</button>
			</form>
		</>
	);
};

export default Test;
