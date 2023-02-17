import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/Signup";
import Header from "./components/Global/Header";
import Inboxs from "./components/products/Inboxs";
import Starred from "./components/products/Starred";
import FireBaseApp from "./firebase/FirebaseApp";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/register" element={<SignUp />} />
				<Route path="/login" index element={<Login />} />
				<Route path="/" element={<Header />}>
					<Route path="" element={<Home />} />
					<Route path="inbox" element={<Inboxs />} />
					<Route path="starred" element={<Starred />} />
					<Route path="firebase" element={<FireBaseApp />} />
				</Route>
				<Route path="*" element={<h1>404 Not Found</h1>} />
			</Routes>
		</div>
	);
}

export default App;
// npx json-server db.json -m ./node_modules/json-server-auth
