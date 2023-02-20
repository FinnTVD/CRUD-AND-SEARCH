import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase-config";
import { setImageAvatar } from "./../reducer/actions";

const listRef = ref(storage, "imgAvatar");

export const getImageAvatar = (state, dispatch) => {
	listAll(listRef).then((res) => {
		//res return object {prefixes,items}
		//items is array
		res.items.forEach((item) => {
			//custom name img
			if (item._location.path_ === `imgAvatar/avatar${state.emailUser}`) {
				getDownloadURL(item).then((url) => {
					dispatch(setImageAvatar(url));
				});
			}
		});
	});
};
