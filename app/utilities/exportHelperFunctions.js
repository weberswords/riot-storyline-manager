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
    let levels = state.levels;

    Object.keys(levels).map( function(levelId,_) {

        Object.keys(levels[levelId].branches).map( function(emotion,_) {
            
            if (!levels[levelId].branches[emotion].enabled) {
                levels[levelId].branches[emotion] = undefined;
            } else {
                levels[levelId].branches[emotion].enabled = undefined;
            }
        });
    });


    state.levels = arrayifyLevelsObject(levels);
}

const arrayifyLevelsObject = (levels) => {
    let levelsArray = new Array(Object.keys(levels).length);

    Object.keys(levels).map((levelIndex,_) => {
        levelsArray[levelIndex-1] = levels[levelIndex];
    });

    return levelsArray;
}

export const convertToMillisecondsAndTrimState = (state, numFrames) => {
    trimStateAndCopy(state);
    traverseAndConvertToMilliseconds(state, numFrames);
}