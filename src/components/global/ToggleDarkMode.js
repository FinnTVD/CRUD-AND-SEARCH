import React from "react";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const ToggleDarkMode = ({ darkMode, onClick }) => {
	return (
		<>
			<button onClick={onClick}>
				{darkMode ? (
					<DarkModeIcon />
				) : (
					<LightModeIcon className="text-light" />
				)}
			</button>
		</>
	);
};

export default ToggleDarkMode;
