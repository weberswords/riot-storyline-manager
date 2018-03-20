import React from 'react';
import ReactDOM from 'react-dom';

const validFormat = (range) => {
	const regex = /^[0-9]{2,2}:[0-9]{2,2}.[0-9]{2,2}/;
	return regex.test(range[0]) && regex.test(range[1]);
}

const validNumFrames = (range, numFrames) => {
	const startFrames = Number(range[0].split(".")[1]);
	const endFrames = Number(range[1].split(".")[1]);

	return ((startFrames >=1 && endFrames >= 1) &&
			(startFrames <= numFrames && endFrames <= numFrames));
}

export const validateRangeInput = (range, numFrames) => {
	if (validFormat(range) && validNumFrames(range, numFrames)) {
		return({display: "none"});
	}
	return({display: "inline",color: "red"});
}