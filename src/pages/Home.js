import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { StateContext } from "../context/ContextApp";
import ContainerApp from "./../components/global/ContainerApp";
import FormDialog from "../components/FormDialog";
import { setIdEdit } from "./../reducer/actions";
import TableHome from "./../components/products/TableHome";

import { Button, Grid } from "@mui/material";
import MessageAlert from "../components/global/MessageAlert";
import BasicPagination from "./../components/global/Pagination";
import useDebounce from "../hooks/useDebounce";

const Home = () => {
	const [state, dispatch] = StateContext();

	const [dataTable, setDataTable] = React.useState([]);
	const [lengthPage, setLengthPage] = React.useState(0);
	const [open, setOpen] = React.useState(false);
	const [action, setAction] = React.useState("");

	const getDataForm = async () => {
		try {
			const res = await fetch("http://localhost:3000/products");
			const data = await res.json();
			const res1 = await fetch(
				state.searchNameProduct
					? `http://localhost:3000/products?nameProduct=${state.searchNameProduct}&_page=${state.paginationCheck}&_limit=5`
					: `http://localhost:3000/products?_page=${state.paginationCheck}&_limit=5`
			);
			const data1 = await res1.json();
			setLengthPage(Math.ceil(data.length / 5));
			setDataTable(data1);
		} catch (err) {
			throw new Error(err);
		}
	};

	const navigate = useNavigate();
	useEffect(() => {
		if (state.alert.severity !== "success") {
			navigate("/login");
		}
	}, []);
	const demo = useDebounce(state.searchNameProduct, 500);

	useEffect(() => {
		getDataForm();
	}, [state.checkDataForm, state.paginationCheck, demo]);

	const handleClickOpenDialog = () => {
		setOpen(true);
	};

	const handleCloseDialog = () => {
		setOpen(false);
	};

	const handleAddForm = () => {
		dispatch(setIdEdit(0));
		setOpen(true);
		setAction("add");
	};

	return (
		<>
			<h1 sx={{ mt: 10 }}>HOME</h1>
			<Grid container xs={12}>
				<ContainerApp maxWidth="xl">
					<Grid item xs={12}>
						<Button variant="contained" onClick={handleAddForm}>
							Add
						</Button>
					</Grid>
					<TableHome
						dataTable={dataTable}
						handleClickOpenDialog={handleClickOpenDialog}
						setAction={setAction}
					/>
				</ContainerApp>
			</Grid>
			<div className="flex justify-center mt-5">
				<BasicPagination lengthPage={lengthPage} />
			</div>
			<FormDialog
				open={open}
				handleClose={handleCloseDialog}
				dataTable={dataTable}
				setDataTable={setDataTable}
				action={action}
			/>
			<MessageAlert />
		</>
	);
};

export default Home;
