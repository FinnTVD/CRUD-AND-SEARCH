import * as React from "react";

import { StateContext } from "../context/ContextApp";
import { setAlert, setCheckDataForm } from "../reducer/actions";
import { addSuccess, updateSuccess } from "../variable/table";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid } from "@mui/material";

export default function FormDialog({ open, handleClose, dataTable, action }) {
	const [state, dispatch] = StateContext();
	const [dataInput, setDataInput] = React.useState({
		nameProduct: "",
		price: "",
		des: "",
	});

	React.useEffect(() => {
		if (state.idEdit > 0) {
			for (let i = 0; i < dataTable.length; i++) {
				if (dataTable[i].id === state.idEdit) {
					setDataInput({
						nameProduct: dataTable[i].nameProduct,
						price: dataTable[i].price,
						des: dataTable[i].des,
					});
				}
			}
		} else {
			setDataInput({
				nameProduct: "",
				price: "",
				des: "",
			});
		}
	}, [state.idEdit]);

	const handleSubmit = async () => {
		try {
			if (action === "add") {
				await fetch("http://localhost:3000/products", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(dataInput),
				});
				setDataInput({
					nameProduct: "",
					price: "",
					des: "",
				});
				dispatch(setCheckDataForm(!state.checkDataForm));
				dispatch(
					setAlert({
						severity: "success",
						open: true,
						message: addSuccess,
					})
				);
			} else {
				await fetch(`http://localhost:3000/products/${state.idEdit}`, {
					method: "PUT",
					headers: {
						"Content-type": "application/json",
					},
					body: JSON.stringify(dataInput),
				});
				dispatch(setCheckDataForm(!state.checkDataForm));
				dispatch(
					setAlert({
						severity: "success",
						open: true,
						message: updateSuccess,
					})
				);
			}
			handleClose();
		} catch (err) {
			throw new Error(err);
		}
	};
	return (
		<>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>
					{action === "add" ? "ADD NEW" : "UPDATE"}
				</DialogTitle>
				<DialogContent>
					<Grid container>
						<Grid item xs={12}>
							<TextField
								autoFocus
								margin="dense"
								id="nameProduct"
								label="Name Product"
								type="email"
								fullWidth
								variant="standard"
								value={dataInput.nameProduct}
								onChange={(e) =>
									setDataInput({
										...dataInput,
										nameProduct: e.target.value,
									})
								}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								autoFocus
								margin="dense"
								id="price"
								label="Price"
								type="number"
								fullWidth
								variant="standard"
								value={dataInput.price}
								onChange={(e) =>
									setDataInput({
										...dataInput,
										price: e.target.value,
									})
								}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								autoFocus
								margin="dense"
								id="des"
								label="Description"
								type="email"
								fullWidth
								variant="standard"
								value={dataInput.des}
								onChange={(e) =>
									setDataInput({
										...dataInput,
										des: e.target.value,
									})
								}
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSubmit}>Confirm</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
