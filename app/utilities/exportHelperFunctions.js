const convertToMilliseconds = (value, numFrames) => {
    const valuesArray = value.split(".");
    const numMillisecondsPerFrame = 1000/Number(numFrames);
    const frame = Number(valuesArray[1])-1; // convert to a 0-indexed format
    const milliseconds = ("000" + Math.round(frame*numMillisecondsPerFrame)).slice(-3);

    return valuesArray[0] + "." + milliseconds;
}

const traverseAndConvertToMilliseconds = (state, numFrames) => {
    if( typeof state == "object" ) {
        Object.entries(state).forEach(([key, value]) => {

            state[key] = undefined;
            state[key.toLowerCase()] = value;
            
            if (key === "start" || key === "end") {
                state[key] = convertToMilliseconds(value, numFrames);
            }
            traverseAndConvertToMilliseconds(value, numFrames);
        });
    }
}

const trimStateAndCopy = (state) => {
    Object.keys(state.levels).map( function(levelId,_) {

        Object.keys(state.levels[levelId].branches).map( function(emotion,_) {

            if (!state.levels[levelId].branches[emotion].enabled) {
                state.levels[levelId].branches[emotion] = undefined;
            } else {
                state.levels[levelId].branches[emotion].enabled = undefined;
            }
        });
    });
}

export const convertToMillisecondsAndTrimState = (state, numFrames) => {
    trimStateAndCopy(state);
    traverseAndConvertToMilliseconds(state, numFrames);
}