import React, { useState, useEffect } from "react";
import translate from "../../../i18n/translate";
import Button from "../UIElements/Button/Button";

import classes from "./Plans.module.scss";

const Plans = ({ offers, addToPayHandler }) => {
	const [plan, setPlan] = useState("");

	useEffect(() => {
		const planId = offers.items.find((plan) => plan.checked === true).id;
		setPlan(planId);
	}, [offers]);

	const choosePlanHandler = () => {
		const selectedPlan = offers.items.find((item) => item.id === plan);
		addToPayHandler(selectedPlan);
	};

	return (
		<article className={classes.Plans}>
			<h2>{offers.title}</h2>
			<p className={classes.description}>{offers.description}</p>
			<p className={classes.border}></p>
			<form action="">
				{offers.items.map((item, i) => {
					return (
						<div className={classes.offerListCheckbox} key={item.id + i}>
							<input
								type="radio"
								id={item.id}
								name="select"
								defaultChecked={item.checked}
								onChange={(evt) => setPlan(evt.target.id)}
							/>
							<label htmlFor={item.id}>
								{item.qty} {translate(item.name)}
								<p>
									Lorem ipsum dolor sit amet consectetur, adipisicing elit.
									Non quod architecto ratione quo culpa labore a odit nobis,
									officiis, soluta reiciendis, placeat delectus possimus?
									Molestias illo beatae facere adipisci cumque!
								</p>
								<span>${item.price}</span>
								<p className={classes.border}></p>
							</label>
						</div>
					);
				})}
				<p>
					By clicking "Continue," you agree to our Terms of Service, Privacy
					Policy, and to receive our email updates.
				</p>
			</form>
			<Button
				externalStyles={classes.continueButton}
				onClick={choosePlanHandler}
			>
				{translate("continue")}
			</Button>
		</article>
	);
};

export default Plans;
