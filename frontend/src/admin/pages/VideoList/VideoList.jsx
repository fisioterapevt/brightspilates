import React, { useContext, useEffect } from "react";
import Moment from "react-moment";

import VideoContext from "../../../context/videoContext/video-context";
import GlobalContext from "../../../context/globalContext/global-context";
import HttpError from "../../../client/components/UIElements/HttpError/HttpError";
import Button from "../../../client/components/UIElements/Button/Button";
import Loader from "../../../client/components/UIElements/Loader/Loader";

import { ReactComponent as EditIcon } from "../../../assets/svg/edit_blue-icon.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/svg/trash_red-icon.svg";

import classes from "./VideoList.module.scss";

const VideoList = ({ history }) => {
	const {
		videos,
		video,
		resetVideoCreation,
		createVideo,
		deleteVideo,
		getAllVideos,
		httpError,
		loading,
		successDelete,
		successCreate,
	} = useContext(VideoContext);
	const { userLogin } = useContext(GlobalContext);

	//console.log(loading); //! DELETE

	const { userInfo } = userLogin;

	//console.log("VIDEO LIST [ USER INFO ]: ", userInfo); //! DELETE

	useEffect(() => {
		if (!userInfo && !userInfo.isAdmin) {
			history.push("/login");
		}

		//* RENDERING TO EDIT VIDEO or GET ALL VIDEOS
		if (successCreate) {
			resetVideoCreation();
			history.push(`/admin/video/${video._id}/edit`);
		} else {
			getAllVideos();
		}
	}, [
		userInfo,
		resetVideoCreation,
		history,
		video,
		getAllVideos,
		successCreate,
		successDelete,
	]);

	//* CREATE VIDEO
	const createVideoHandler = () => {
		createVideo(userInfo);
	};

	//* DELETE VIDEO
	const deleteHandler = (id, userInfo) => {
		if (window.confirm("Are you sure ?")) {
			deleteVideo(id);
		}
	};

	return (
		<section className={classes.VideoList}>
			<Button onClick={createVideoHandler} externalStyles={classes.create}>
				Создать видео
			</Button>
			<div className={classes.VideoList}>
				{loading ? (
					<Loader />
				) : httpError ? (
					<HttpError>
						<p>{httpError}</p>
					</HttpError>
				) : (
					<table>
						<thead>
							<tr>
								<th>CREATED</th>
								<th>UPDATED</th>
								<th>ID</th>
								<th>NAME</th>
								<th>IMAGE</th>
								<th>VIDEO</th>
								<th>COACH</th>
								<th>LEVEL</th>
								<th>CATEGORY</th>
								<th>RATING</th>
								<th>REVIEW</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{videos.map((video) => (
								<tr key={video._id}>
									<td>
										<Moment
											date={new Date(video.createdAt)}
											format="DD-MM-YYYY"
										/>
									</td>
									<td>
										<Moment
											date={new Date(video.updatedAt)}
											format="DD-MM-YYYY"
										/>
									</td>
									<td>{video._id}</td>
									<td className={classes.name}>{video.name}</td>
									<td>{video.image}</td>
									<td>{video.videoclip}</td>
									<td>{video.coach}</td>
									<td>{video.level}</td>
									<td>{video.caregory}</td>
									<td>{video.rating}</td>
									<td>{video.numReviews}</td>
									<td className={classes.buttons}>
										<Button
											to={`/admin/video/${video._id}/edit`}
											externalStyles={classes.edit}
										>
											<EditIcon />
										</Button>
										<Button
											type="button"
											externalStyles={classes.delete}
											onClick={() => deleteHandler(video._id)}
										>
											<DeleteIcon />
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</section>
	);
};

export default VideoList;
