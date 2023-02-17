import React from "react";

import { setOpenAlert } from "../../reducer/actions";
import { StateContext } from "../../context/ContextApp";

import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

const MessageAlert = () => {
	const [state, dispatch] = StateContext();

	const vertical = "bottom";
	const horizontal = "right";

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		dispatch(setOpenAlert(false));
	};
	return (
		<Snackbar
			open={state.alert.open}
			autoHideDuration={4000}
			anchorOrigin={{ vertical, horizontal }}
			onClose={handleClose}
		>
			<Alert
				onClose={handleClose}
				variant="filled"
				severity={state.alert.severity}
				sx={{ width: "100%" }}
			>
				{state.alert.message}
			</Alert>
		</Snackbar>
	);
};

export default MessageAlert;
