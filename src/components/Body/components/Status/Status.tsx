import React, { FC } from "react";
import { Typography } from "@mui/material";
import { useImprovBotContext } from "../../../ImprovBotContext";
import { useShowTimeContext } from "../../../ShowTimeContext";
//from https://stackoverflow.com/questions/31337370/how-to-convert-seconds-to-hhmmss-in-moment-js
const pad = (num: number) => {
	return ("0" + num).slice(-2);
};
const hhmmss = (secs: number) => {
	if (secs === Infinity) return `∞∞:∞∞`;
	var minutes = Math.floor(secs / 60);
	secs = secs % 60;
	var hours = Math.floor(minutes / 60);
	minutes = minutes % 60;
	return `${pad(minutes)}:${pad(secs)}`;
	// return pad(hours)+":"+pad(minutes)+":"+pad(secs); for old browsers
};

export const Status: FC = () => {
	const { logs } = useImprovBotContext();
	const { overallShowTimer, individualTimer } = useShowTimeContext();
	return (
		<>
			<Typography variant="h4">{hhmmss(overallShowTimer)}</Typography>
			<Typography variant="h4">{hhmmss(individualTimer)}</Typography>
			{logs.map((log) => {
				return <Typography>{log}</Typography>;
			})}
		</>
	);
};
