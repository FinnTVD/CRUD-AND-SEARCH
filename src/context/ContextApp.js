import React from "react";
import { reducer } from "./../reducer/Reducer";
import { initialState } from "./../reducer/InitialState";
const AppContext = React.createContext();

const ContextApp = ({ children }) => {
	const [state, dispatch] = React.useReducer(reducer, initialState);
	return (
		<AppContext.Provider value={[state, dispatch]}>
			{children}
		</AppContext.Provider>
	);
};

export default ContextApp;
export const StateContext = () => React.useContext(AppContext);
