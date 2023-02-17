export const reducer = (state, action) => {
	switch (action.type) {
		case "SET_OPEN":
			return {
				...state,
				alert: {
					...state.alert,
					open: action.payload,
				},
			};
		case "SET_ALERT":
			return {
				...state,
				alert: {
					severity: action.payload.severity,
					open: action.payload.open,
					message: action.payload.message,
				},
			};
		case "SET_ACCOUNT":
			return { ...state, account: action.payload };
		case "SET_DIALOG":
			return {
				...state,
				[action.payload.target.name]: action.payload.target.value,
			};
		case "SET_CHECK_DATA_FORM":
			return {
				...state,
				checkDataForm: action.payload,
			};
		case "SET_ID_EDIT":
			return {
				...state,
				idEdit: action.payload,
			};
		case "SET_PAGINATION_CHECK":
			return {
				...state,
				paginationCheck: action.payload,
			};
		case "SET_SEARCH_NAME_PRODUCT":
			return {
				...state,
				searchNameProduct: action.payload,
			};
		default:
			console.log("default");
	}
};
