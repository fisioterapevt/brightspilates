import React from "react";

import translate from "../../../i18n/translate";
import Button from "../UIElements/Button/Button";

import classes from "./OrderList.module.scss";

const OrderList = ({ orders, deleteOrder, userInfo, history }) => {
	const goToPlaceOrder = (id) => {
		//? add order to pay
		//? add oder to state
		history.push(`/profile/order/${id}/pay`);
	};

	let orderlist;
	if (orders.length === 0) {
		orderlist = <p>Ничего нет</p>;
	} else {
		orderlist = (
			<ul>
				{orders.map((order) => {
					return (
						<li key={order._id}>
							<h2>{translate(order.fullName)}</h2>
							<h3>${order.price}</h3>
							<span>
								{order.isPaid ? translate("paid") : translate("not_paid")}
								<Button
									type="button"
									onClick={() => goToPlaceOrder(order._id)}
								>
									{translate("to_pay")}
								</Button>
								<Button
									type="button"
									onClick={() => deleteOrder(order._id, userInfo)}
								>
									{translate("delete")}
								</Button>
							</span>
						</li>
					);
				})}
			</ul>
		);
	}

	return (
		<div className={classes.OrderList}>
			<h2>ORDERS</h2>
			{orderlist}
		</div>
	);
};

export default OrderList;
