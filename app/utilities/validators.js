const isValid = (value, numFrames) => {
	return (validFormat(value) 
		&& validNumFrames(value, numFrames)
		&& validSeconds(value));
}

const validFormat = (value) => {
	const regex = /^[0-9]{2,2}:[0-9]{2,2}.[0-9]{2,2}/;
	return regex.test(value);
}

const validNumFrames = (value, numFrames) => {
	let [,,frames] = value.split(/[:.]/);
	return (frames >=1  && frames <= numFrames);
}

const validSeconds = (value) => {
	let [,seconds,] = value.split(/[:.]/);
	return (seconds >=0  && seconds < 60);
}

export const endIsLaterThanStart = (range) => {
	const [startMins, startSeconds, startFrames] = range[0].split(/[:.]/).map((el) => Number(el));
	const [endMins, endSeconds, endFrames] = range[1].split(/[:.]/).map((el) => Number(el));

	return (startMins === endMins 
			? (startSeconds === endSeconds 
				? (startFrames === endFrames
					? true
					: endFrames > startFrames)
				: endSeconds > startSeconds)
			: endMins > startMins);
}

export const isValidInput = (range, numFrames) => {
	return isValid(range[0], numFrames) 
		&& isValid(range[1], numFrames);
}

export const validateAllInputs = (state, numFrames) => {
	let valid = true;

	let traverser = (obj) => {
	  if (typeof obj == "object") {
        Object.entries(obj).forEach(([key, value]) => {
            if (key === "start") {
            	const startTime = obj.start;
            	const endTime = obj.end;

            	if (!isValid(startTime, numFrames) 
            	 || !isValid(endTime, numFrames) 
            	 || !endIsLaterThanStart([startTime, endTime])) {
                	valid = false;
            	}
            }
            traverser(value);
        });
	  }
	};

	traverser(state);
	return valid;
};
