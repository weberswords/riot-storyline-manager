const isValid = (value, numFrames) => {
	return (validFormat(value) && validNumFrames(value, numFrames));
}

const validFormat = (value) => {
	const regex = /^[0-9]{2,2}:[0-9]{2,2}.[0-9]{2,2}/;
	return regex.test(value);
}

const validNumFrames = (value, numFrames) => {
	const frames = Number(value.split(".")[1]);
	return (frames >=1  && frames <= numFrames);
}

export const isValidInput = (range, numFrames) => {
	return isValid(range[0], numFrames) && isValid(range[1], numFrames);
}

export const validateAllInputs = (state, numFrames) => {
	let valid = true;
	let traverser = (obj) => {
	  if (typeof obj == "object") {
        Object.entries(obj).forEach(([key, value]) => {
            if ((key === "start" || key === "end") && !isValid(value, numFrames)) {
                valid = false;
            }
            traverser(value);
        });
	  }
	};
	traverser(state);
	return valid;
};
