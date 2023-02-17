import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { StateContext } from "../../context/ContextApp";
import { setPaginationCheck } from "../../reducer/actions";

export default function BasicPagination({ lengthPage }) {
	const [state, dispatch] = StateContext();
	const handleChangePage = (e, page) => {
		dispatch(setPaginationCheck(page));
	};
	return (
		<Stack spacing={2}>
			<Pagination
				count={lengthPage}
				onChange={(e, page) => handleChangePage(e, page)}
				color="primary"
			/>
		</Stack>
	);
}
