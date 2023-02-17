import * as React from "react";

import { setCheckDataForm, setIdEdit } from "./../../reducer/actions";
import { StateContext } from "../../context/ContextApp";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

export default function TableHome({
	dataTable,
	handleClickOpenDialog,
	setAction,
}) {
	const [state, dispatch] = StateContext();

	const handleEditForm = (id) => {
		setAction("edit");
		dispatch(setIdEdit(id));
		handleClickOpenDialog();
	};

	const handleDeleteForm = async (id) => {
		try {
			await fetch(`http://localhost:3000/products/${id}`, {
				method: "DELETE",
			});
			dispatch(setCheckDataForm(!state.checkDataForm));
		} catch (err) {
			throw new Error(err);
		}
	};

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell align="right">ID</TableCell>
						<TableCell align="right">nameProduct</TableCell>
						<TableCell align="right">Price</TableCell>
						<TableCell align="right">Description</TableCell>
						<TableCell align="right">Action</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{dataTable &&
						dataTable.map((e) => {
							return (
								<TableRow key={e.id}>
									<TableCell align="right">{e.id}</TableCell>
									<TableCell align="right">
										{e.nameProduct}
									</TableCell>
									<TableCell align="right">
										{e.price}
									</TableCell>
									<TableCell align="right">{e.des}</TableCell>
									<TableCell align="right">
										<Button
											onClick={() => handleEditForm(e.id)}
											variant="contained"
											color="success"
										>
											Edit
										</Button>
										<Button
											onClick={() =>
												handleDeleteForm(e.id)
											}
											variant="outlined"
											color="error"
										>
											Delete
										</Button>
									</TableCell>
								</TableRow>
							);
						})}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
