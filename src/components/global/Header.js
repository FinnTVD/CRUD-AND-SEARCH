import * as React from "react";
import { Link as LinkRouter, Outlet, useNavigate } from "react-router-dom";

import { setAlert, setImageAvatar } from "../../reducer/actions";
import { StateContext } from "../../context/ContextApp";

import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import HomeIcon from "@mui/icons-material/Home";

import MenuLeft from "./MenuLeft";
import { setSearchNameProduct } from "./../../reducer/actions";
import ToggleDarkMode from "./ToggleDarkMode";

import useDarkMode from "./../../hooks/useDarkMode";

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(3),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
}));

export default function Header() {
	const [state, dispatch] = StateContext();
	const [darkMode, setDarkMode] = useDarkMode();

	const navigate = useNavigate();

	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
	const [toggle, setToggle] = React.useState(false);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	React.useEffect(() => {}, [state.imageAvatar]);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = (e) => {
		changeURL(e.target.innerText);
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const changeURL = (paragraph = "") => {
		paragraph = paragraph.trim().toLowerCase().replaceAll(" ", "-");
		navigate(`/${paragraph}`);
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const handleLogOut = () => {
		dispatch(
			setAlert({
				severity: "",
				open: false,
				message: "",
			})
		);
		dispatch(setImageAvatar(null));
	};

	const menuId = "primary-search-account-menu";
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
			<MenuItem onClick={handleMenuClose}>My account</MenuItem>
			<LinkRouter to="/login">
				<MenuItem onClick={handleLogOut}>Log out</MenuItem>
			</LinkRouter>
		</Menu>
	);

	const mobileMenuId = "primary-search-account-menu-mobile";
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<IconButton
					size="large"
					aria-label="show 4 new mails"
					color="inherit"
				>
					<Badge badgeContent={4} color="error">
						<MailIcon />
					</Badge>
				</IconButton>
				<p>Messages</p>
			</MenuItem>
			<MenuItem>
				<IconButton
					size="large"
					aria-label="show 17 new notifications"
					color="inherit"
				>
					<Badge badgeContent={17} color="error">
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<p>Notifications</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					size="large"
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
				>
					{state.imageAvatar ? (
						<img
							src={state.imageAvatar}
							className="inline-block w-[48px] h-[48px] object-cover rounded-full"
							alt=""
						/>
					) : (
						<AccountCircle />
					)}
				</IconButton>
				<p>Profile</p>
			</MenuItem>
		</Menu>
	);

	const handleToggleMenuLeft = () => {
		setToggle(!toggle);
	};

	const handleSearch = (e) => {
		dispatch(setSearchNameProduct(e.target.value));
	};

	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							onClick={handleToggleMenuLeft}
							size="large"
							edge="start"
							color="inherit"
							aria-label="open drawer"
							sx={{ mr: 2 }}
						>
							<MenuIcon />
						</IconButton>
						<MenuLeft toggle={toggle} setToggle={setToggle} />
						<LinkRouter to="/">
							<Typography
								variant="h6"
								noWrap
								component="div"
								sx={{ display: { xs: "none", sm: "block" } }}
							>
								<HomeIcon />
							</Typography>
						</LinkRouter>
						<Search onChange={(e) => handleSearch(e)}>
							<SearchIconWrapper>
								<SearchIcon />
							</SearchIconWrapper>
							<StyledInputBase
								placeholder="Search…"
								inputProps={{ "aria-label": "search" }}
							/>
						</Search>
						<Box sx={{ flexGrow: 1 }} />
						<Box sx={{ display: { xs: "none", md: "flex" } }}>
							<IconButton>
								<ToggleDarkMode
									darkMode={darkMode}
									onClick={() => setDarkMode(!darkMode)}
								/>
							</IconButton>
							<IconButton
								size="large"
								aria-label="show 4 new mails"
								color="inherit"
							>
								<Badge badgeContent={4} color="error">
									<MailIcon />
								</Badge>
							</IconButton>
							<IconButton
								size="large"
								aria-label="show 17 new notifications"
								color="inherit"
							>
								<Badge badgeContent={17} color="error">
									<NotificationsIcon />
								</Badge>
							</IconButton>
							<IconButton
								size="large"
								edge="end"
								aria-label="account of current user"
								aria-controls={menuId}
								aria-haspopup="true"
								onClick={handleProfileMenuOpen}
								color="inherit"
							>
								{state.imageAvatar ? (
									<img
										src={state.imageAvatar}
										className="inline-block w-[36px] h-[36px] object-cover rounded-full"
										alt=""
									/>
								) : (
									<AccountCircle />
								)}
							</IconButton>
						</Box>
						<Box sx={{ display: { xs: "flex", md: "none" } }}>
							<IconButton
								size="large"
								aria-label="show more"
								aria-controls={mobileMenuId}
								aria-haspopup="true"
								onClick={handleMobileMenuOpen}
								color="inherit"
							>
								<MoreIcon />
							</IconButton>
						</Box>
					</Toolbar>
				</AppBar>
				{renderMobileMenu}
				{renderMenu}
			</Box>
			<Outlet></Outlet>
		</>
	);
}
