import React, { useEffect, useContext } from "react";
import Moment from "react-moment";

import HttpError from "../../../client/components/UIElements/HttpError/HttpError";
import GlobalContext from "../../../context/globalContext/global-context";
import translate from "../../../i18n/translate";
import Button from "../../../client/components/UIElements/Button/Button";
import { ReactComponent as CloseIcon } from "../../../assets/svg/close_red-icon.svg";
import { ReactComponent as CheckIcon } from "../../../assets/svg/checkmark_green-icon.svg";
import { ReactComponent as EditIcon } from "../../../assets/svg/edit_blue-icon.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/svg/trash_red-icon.svg";

import classes from "./UserList.module.scss";

//import Loader from "../../../components/Loader/Loader";
//import Message from "../../../components/Message/Message";

const UserList = ({ history }) => {
	const {
		users,
		userLogin,
		getListUsers,
		deleteUser,
		httpError,
		successDelete,
		loading,
	} = useContext(GlobalContext);
	const { userInfo } = userLogin;

	//console.log(userInfo); //!

	//console.log("RENDER [USER LIST]"); //!

	useEffect(() => {
		if (!userInfo && !userInfo.isAdmin) {
			history.push("/login");
		}
		getListUsers();
		if (userInfo && userInfo.isAdmin) {
			getListUsers();
		} else {
			history.push("/login");
		}
	}, [history, userInfo, getListUsers, successDelete]);

	const deleteHandler = (id) => {
		if (window.confirm("Are you sure ?")) {
			deleteUser(id);
		}
	};

	return (
		<section className={classes.UserList}>
			<h1>Users</h1>
			{loading && <h1>LOADING...</h1>}
			{httpError && (
				<HttpError>
					<p>{translate(httpError, {})}</p>
				</HttpError>
			)}
			<table>
				<thead>
					<tr>
						<th>CREATED</th>
						<th>UPDATED</th>
						<th>ID</th>
						<th>NAME</th>
						<th>EMAIL</th>
						<th></th>
						<th>ADMIN</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user._id}>
							<td>
								<Moment>{user.createdAt}</Moment>
							</td>
							<td>
								<Moment>{user.updatedAt}</Moment>
							</td>
							<td>{user._id}</td>
							<td className={classes.userName}>{user.name}</td>
							<td>
								<a href={`mailto:${user.email}`}>{user.email}</a>
							</td>
							<td>
								<Button
									to={`/admin/user/${user._id}/edit`}
									externalStyles={classes.editUser}
								>
									<EditIcon />
								</Button>
								<Button
									type="button"
									externalStyles={classes.deleteUser}
									disabled={user.isAdmin}
									onClick={() => deleteHandler(user._id)}
								>
									<DeleteIcon />
								</Button>
							</td>
							<td>{user.isAdmin ? <CheckIcon /> : <CloseIcon />}</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
};

export default UserList;
