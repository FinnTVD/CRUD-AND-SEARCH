import React from "react";
import { storage } from "../../firebase/firebase-config";
import { ref, uploadBytes } from "firebase/storage";
import { StateContext } from "../../context/ContextApp";
import { setAlert } from "../../reducer/actions";
import { getImageAvatar } from "./../../utils/getImageAvatar";
import { Button } from "@mui/material";
import {
	changeAvatarError,
	changeAvatarSuccsess,
} from "./../../variable/profileUser";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const Profile = () => {
	const [state, dispatch] = StateContext();
	const [img, setImg] = React.useState(null);
	const [preview, setPreview] = React.useState(null);
	const [isUpload, setIsUpload] = React.useState(false);

	const handlePreview = (e) => {
		const file = e.target.files[0];
		const url = URL.createObjectURL(file);
		setImg(file);
		setPreview(url);
		setIsUpload(true);
	};

	const handleUpload = () => {
		if (img == null) return;
		const imgRef = ref(storage, `imgAvatar/avatar${state.emailUser}`);
		uploadBytes(imgRef, img)
			.then(() => {
				dispatch(
					setAlert({
						severity: "success",
						open: true,
						message: changeAvatarSuccsess,
					})
				);
				getImageAvatar(state, dispatch);
			})
			.catch(() => {
				dispatch(
					setAlert({
						severity: "error",
						open: true,
						message: changeAvatarError,
					})
				);
			});
		setIsUpload(false);
		document.querySelector("#avatar").value = "";
	};

	return (
		<>
			<label htmlFor="avatar" className="flex justify-center my-10">
				<img
					className="block w-[400px] h-[400px] rounded-full border object-cover"
					src={preview ? preview : state.imageAvatar}
					alt="avatar"
				/>
			</label>
			<div className="flex flex-col items-center gap-y-3">
				<input
					type="file"
					name=""
					id="avatar"
					onChange={handlePreview}
				/>
				<Button
					className="block bg-blue-500 py-1 px-4 rounded-md"
					variant="contained"
					disabled={isUpload ? false : true}
					onClick={handleUpload}
				>
					Up load
				</Button>
				<PhotoCamera />
			</div>
		</>
	);
};

export default Profile;
