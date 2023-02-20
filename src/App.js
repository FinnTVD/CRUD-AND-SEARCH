import * as React from "react";

import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/Signup";
import Header from "./components/Global/Header";
import Inboxs from "./components/products/Inboxs";
import Starred from "./components/products/Starred";
import FireBaseApp from "./firebase/FirebaseApp";
import Profile from "./components/user/Profile";
import MessageAlert from "./components/global/MessageAlert";
import Test from "./Test";

function App() {
	// const move = () => {
	// 	let i = 0;
	// 	if (i === 0) {
	// 		i = 1;
	// 		const elem = document.getElementById("loading");
	// 		let width = 1;
	// 		const id = setInterval(frame, 10);
	// 		function frame() {
	// 			if (width >= 100) {
	// 				clearInterval(id);
	// 				i = 0;
	// 			} else {
	// 				width++;
	// 				elem.style.width = width + "%";
	// 			}
	// 			if (width >= 100) {
	// 				setTimeout(() => (elem.style.display = "none"), 150);
	// 			}
	// 		}
	// 	}
	// };
	// React.useEffect(() => move(), []);

	return (
		<div className="w-full h-screen dark:bg-darkMode">
			{/* <div
				id="loading"
				className="absolute top-0 left-0 right-0 w-full h-1 bg-blue-600"
			></div> */}
			<Routes>
				<Route path="/register" element={<SignUp />} />
				<Route path="/login" index element={<Login />} />
				<Route path="/" element={<Header />}>
					<Route path="" element={<Home />} />
					<Route path="inbox" element={<Inboxs />} />
					<Route path="starred" element={<Starred />} />
					<Route path="firebase" element={<FireBaseApp />} />
					<Route path="profile" element={<Profile />} />
					<Route path="test" element={<Test />} />
				</Route>
				<Route
					path="*"
					element={<h1 className="dark:text-light">404 Not Found</h1>}
				/>
			</Routes>
			<MessageAlert />
		</div>
	);
}

export default App;
// npx json-server db.json -m ./node_modules/json-server-auth
