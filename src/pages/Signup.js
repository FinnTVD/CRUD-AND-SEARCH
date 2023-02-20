import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Link as LinkRouter } from "react-router-dom";
import { StateContext } from "../context/ContextApp";
import { setAlert } from "../reducer/actions";
import { signUpError, signUpSuccess } from "./../variable/authen";
import { regexEmail } from "./../variable/regex";

const theme = createTheme();

export default function SignUp() {
	const [, dispatch] = StateContext();
	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		if (data.get("email").match(regexEmail) == null)
			return dispatch(
				setAlert({
					message: "Tên tài khoản không hợp lệ!",
					open: true,
					severity: "error",
				})
			);
		fetch("http://localhost:3000/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: data.get("email"),
				password: data.get("password"),
			}),
		})
			.then((res) => {
				if (res.status === 201) {
					dispatch(
						setAlert({
							message: signUpSuccess,
							open: true,
							severity: "success",
						})
					);
					navigate("/login");
				} else {
					dispatch(
						setAlert({
							message: signUpError,
							open: true,
							severity: "error",
						})
					);
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									type="email"
									autoFocus
									autoComplete="off"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="off"
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign Up
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<LinkRouter to="/login">
									Already have an account?{" "}
									<span className="text-blue-600 underline">
										Sign in
									</span>
								</LinkRouter>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
