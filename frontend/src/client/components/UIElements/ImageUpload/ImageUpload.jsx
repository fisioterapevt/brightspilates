import React, { useState, useEffect } from "react";

import { ReactComponent as UploadIcon } from "../../../../assets/svg/upload_picture-icon.svg";
import classes from "./ImageUpload.module.scss";

const ImageUpload = ({
	id,
	imageUrl,
	previewUrl,
	setPreviewUrl,
	setFile,
	file,
}) => {
	useEffect(() => {
		if (!file) {
			return;
		}
		const fileReader = new FileReader();
		fileReader.onload = () => {
			setPreviewUrl(fileReader.result);
		};
		fileReader.readAsDataURL(file);
	}, [file, setPreviewUrl]);

	const pikedFileHandler = (evt) => {
		let pickedFile;
		if (evt.target.files && evt.target.files.length === 1) {
			pickedFile = evt.target.files[0];
			setFile(pickedFile);
		} else {
			console.log("Error");
		}
	};

	return (
		<div className={classes.ImageUpload}>
			{previewUrl && <img src={previewUrl} alt="Preview" />}
			{!previewUrl && <img src={`/${imageUrl}`} alt="Current" />}
			<label htmlFor={id}>
				<UploadIcon />
			</label>
			<input
				id={id}
				type="file"
				onChange={pikedFileHandler}
				value=""
				accept=".jpg, .jpeg, .png, .gif, .bmp"
			></input>
		</div>
	);
};

export default ImageUpload;
