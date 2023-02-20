import * as React from "react";

import { setAlert, setCheckDataForm, setIdEdit } from "./../../reducer/actions";
import { StateContext } from "../../context/ContextApp";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { deleteSuccess } from "./../../variable/table";

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
			dispatch(
				setAlert({
					severity: "success",
					open: true,
					message: deleteSuccess,
				})
			);
		} catch (err) {
			throw new Error(err);
		}
	};

	return (
		<TableContainer className="dark:bg-[#313030]" component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell align="center" className="dark:!text-light">
							ID
						</TableCell>
						<TableCell align="center" className="dark:!text-light">
							nameProduct
						</TableCell>
						<TableCell align="center" className="dark:!text-light">
							Price
						</TableCell>
						<TableCell align="center" className="dark:!text-light">
							Description
						</TableCell>
						<TableCell align="center" className="dark:!text-light">
							Action
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{dataTable &&
						dataTable.map((e) => {
							return (
								<TableRow key={e.id}>
									<TableCell
										align="center"
										className="dark:!text-light"
									>
										{e.id}
									</TableCell>
									<TableCell
										align="center"
										className="dark:!text-light"
									>
										{e.nameProduct}
									</TableCell>
									<TableCell
										align="center"
										className="dark:!text-light"
									>
										{e.price}
									</TableCell>
									<TableCell
										align="center"
										className="dark:!text-light"
									>
										{e.des}
									</TableCell>
									<TableCell
										align="center"
										className="dark:!text-light"
									>
										<Button
											onClick={() => handleEditForm(e.id)}
											variant="contained"
											color="success"
											className="!mr-4"
										>
											Edit
										</Button>
										<Button
											onClick={() =>
												handleDeleteForm(e.id)
											}
											variant="contained"
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
