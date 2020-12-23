import React from "react";

import classes from "./Calendar.module.scss";

const Calendar = () => {
	return (
		<section className={classes.Calendar}>
			<iframe
				title="calendar"
				src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=2&amp;bgcolor=%23ffffff&amp;ctz=Asia%2FAlmaty&amp;src=Y19qbjVsb3Y2b3VhbmR1Nm1zZHU4YjZxdDdoOEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&amp;color=%238E24AA&amp;showCalendars=0&amp;showPrint=0&amp;showTitle=0&amp;title=Training&amp;mode=WEEK"
				style={{ borderWidth: 0 }}
				width="100%"
				height="100%"
				frameBorder="0"
				scrolling="no"
			></iframe>
		</section>
	);
};

export default Calendar;
