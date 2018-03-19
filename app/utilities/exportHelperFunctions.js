const convertToMilliseconds = (value, numFrames) => {
    const valuesArray = value.split(".");
    const numMillisecondsPerFrame = 1000/Number(numFrames);
    const milliseconds = ("000" + Math.floor(Number(valuesArray[1])*numMillisecondsPerFrame)).slice(-3);

    return valuesArray[0] + "." + milliseconds;
}

const traverseAndConvertToMilliseconds = (state, numFrames) => {
    if( typeof state == "object" ) {
        Object.entries(state).forEach(([key, value]) => {
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
            }
        });
    });
}

export const convertToMillisecondsAndTrimState = (state, numFrames) => {
    trimStateAndCopy(state);
    traverseAndConvertToMilliseconds(state, numFrames);
}