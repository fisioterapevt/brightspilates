import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import VideoContext from "../../../context/videoContext/video-context";
import UserContext from "../../../context/userContext/user-context";
import Loader from "../../../client/components/UIElements/Loader/Loader";
import Input from "../../../client/components/UIElements/Input/Input";

import classes from "./VideoEdit.module.scss";

//import Message from "../../../components/Message/Message";
//import Loader from "../../../components/Loader/Loader";
//import FormContainer from "../../../components/FormContainer/FormContainer";

const VideoEdit = ({ match, history }) => {
	const { video, loading, successUpdate } = useContext(VideoContext);
	const { uploadContent } = useContext(UserContext);

	const videoId = match.params.id;

	const [name, setName] = useState("");
	const [image, setImage] = useState("");
	const [previewImage, setPreviewImage] = useState("");
	const [videoclip, setVideoclip] = useState("");
	const [coach, setCoach] = useState("");
	const [level, setLevel] = useState("");
	const [category, setCategory] = useState("");
	const [description, setDescription] = useState("");

	//const [uploading, setUploading] = useState(false);

	useEffect(() => {
		if (successUpdate) {
			history.push("/admin/videolist");
		} else {
			if (!video.name || video._id !== videoId) {
				//listProductDetails(videoId);
			} else {
				setName(video.name);
				setImage(video.image);
				setVideoclip(video.videoclip);
				setCategory(video.category);
				setCoach(video.coach);
				setLevel(video.level);
				setDescription(video.description);
			}
		}
	}, [history, successUpdate, video, videoId]);

	//const uploadFileHandler = async (evt) => {
	//	const file = evt.target.files[0];
	//	const formData = new FormData();
	//	formData.append("image", file);
	//	setUploading(true);
	//UPLOAD FILE

	//try {
	//	const config = {
	//		headers: { "Content-Type": "multipart/form-data" },
	//	};

	//	const { data } = await axios.post("/api/upload", formData, config);

	//	setImage(data);
	//	setUploading(false);
	//} catch (error) {
	//	console.log(error);
	//	setUploading(false);
	//}
	//};

	//const submitHandler = (evt) => {
	//	evt.preventDefault();
	//	dispatch(
	//		updateProduct({
	//			_id: productId,
	//			name,
	//			price,
	//			image,
	//			brand,
	//			countInStock,
	//			category,
	//			description,
	//		})
	//	);
	//};

	const uploadFileHandler = (evt) => {
		const file = evt.target.files[0];

		if (file) {
			const reader = new FileReader();
			reader.onload = function (e) {
				setPreviewImage(e.target.result);
			};
			reader.readAsDataURL(file);

			uploadContent("content", file);
		}
	};

	return (
		<>
			<h1>Edit Product</h1>
			<Link to="/admin/videolist">Go Back</Link>
			{loading && <Loader />}
			<form>
				<Input value={name} onChange={(evt) => setName(evt.target.value)} />
				<Input value={image} onChange={(evt) => setImage(evt.target.value)} />
				<div className={classes.preview}>
					<img src={previewImage || image} alt={name} />
					<label htmlFor="image-file"></label>
					<input
						id="image-file"
						type="file"
						onChange={uploadFileHandler}
						accept=".jpg, .jpeg, .png, .gif, .bmp, .mp4"
					></input>
				</div>
				<Input
					value={videoclip}
					onChange={(evt) => setVideoclip(evt.target.value)}
				/>
				<Input value={coach} onChange={(evt) => setCoach(evt.target.value)} />
				<Input value={level} onChange={(evt) => setLevel(evt.target.value)} />
				<Input
					value={category}
					onChange={(evt) => setCategory(evt.target.value)}
				/>
				<Input
					value={description}
					onChange={(evt) => setDescription(evt.target.value)}
					elementType="textarea"
				/>
			</form>
			{/*<FormContainer>
				<h1>Edit Product</h1>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId="name">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="name"
								placeholder="Enter Name"
								value={name}
								onChange={(evt) => setName(evt.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId="price">
							<Form.Label>Price</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter price"
								value={price}
								onChange={(evt) => setPrice(evt.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId="image">
							<Form.Label>Image</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter image url"
								value={image}
								onChange={(evt) => setImage(evt.target.value)}
							></Form.Control>
							<Form.File
								id="image-file"
								label="Choose File"
								custom
								onChange={uploadFileHandler}
							></Form.File>
							{uploading && <Loader />}
						</Form.Group>

						<Form.Group controlId="brand">
							<Form.Label>Brand</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter brand"
								value={brand}
								onChange={(evt) => setBrand(evt.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId="countInStock">
							<Form.Label>Count In Stock</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter countInStock"
								value={countInStock}
								onChange={(evt) => setCountInStock(evt.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId="category">
							<Form.Label>Category</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter category"
								value={category}
								onChange={(evt) => setCategory(evt.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId="description">
							<Form.Label>Description</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter description"
								value={description}
								onChange={(evt) => setDescription(evt.target.value)}
							></Form.Control>
						</Form.Group>

						<Button type="submit" variant="primary">
							Update
						</Button>
					</Form>
				)}
			</FormContainer>*/}
		</>
	);
};

export default VideoEdit;
