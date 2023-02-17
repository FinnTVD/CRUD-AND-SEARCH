import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	// getDocs,
	onSnapshot,
	serverTimestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebase-config";

const FireBaseApp = () => {
	const [posts, setPosts] = useState([]);
	const colRef = collection(db, "posts");
	useEffect(() => {
		// getDocs(colRef)
		// 	.then((res) => {
		// 		let posts = [];
		// 		res.docs.forEach((doc) => {
		// 			posts.push({
		// 				id: doc.id,
		// 				...doc.data(),
		// 			});
		// 		});
		// 		console.log("posts", posts);
		// 		setPosts(posts);
		// 	})
		// 	.catch((err) => {
		// 		throw new Error(err);
		// 	});
		onSnapshot(colRef, (snapshot) => {
			let posts = [];
			snapshot.docs.forEach((doc) => {
				posts.push({
					id: doc.id,
					...doc.data(),
				});
			});
			setPosts(posts);
		});
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		addDoc(colRef, {
			title: e.target[0].value,
			content: e.target[1].value,
			author: e.target[2].value,
			createdAt: serverTimestamp(),
		})
			.then((res) => console.log("success"))
			.catch((err) => console.log(err));
	};

	const handleSubmitDelete = (e) => {
		e.preventDefault();
		const postsId = e.target[0].value;
		const colRefDelete = doc(db, "posts", postsId);
		deleteDoc(colRefDelete)
			.then((res) => {
				console.log("success");
			})
			.catch((err) => console.log(err));
	};
	return (
		<>
			<div>Firebase App</div>
			<form action="" onSubmit={(e) => handleSubmit(e)}>
				<input
					className="border border-gray-200 outline-none focus:border-blue-500"
					type="text"
					name="title"
					id=""
				/>
				<input
					className="border border-gray-200 outline-none focus:border-blue-500"
					type="text"
					name="content"
					id=""
				/>
				<input
					className="border border-gray-200 outline-none focus:border-blue-500"
					type="text"
					name="author"
					id=""
				/>
				<button type="submit">Post</button>
			</form>
			<form action="" onSubmit={(e) => handleSubmitDelete(e)}>
				<input
					className="border border-gray-200 outline-none focus:border-blue-500"
					type="text"
					name="postsId"
					id=""
				/>
				<button type="submit">delete</button>
			</form>
			{posts &&
				posts.map((e) => {
					return (
						<div key={e.id}>
							<h2>{e.title}</h2>
							<p>{e.content}</p>
							<h3>{e.author}</h3>
						</div>
					);
				})}
		</>
	);
};

export default FireBaseApp;
