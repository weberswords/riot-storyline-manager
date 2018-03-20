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

const trimStateAndArrayify = (state) => {
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
    state.intros = arrayifySlidesObject(state.intros, "intro");
    state.credits = arrayifySlidesObject(state.credits, "credit");
}

const arrayifyLevelsObject = (levels) => {
    let levelsArray = new Array(Object.keys(levels).length);
    Object.keys(levels).map((levelIndex,_) => {
        levelsArray[levelIndex-1] = levels[levelIndex];
    });
    return levelsArray;
}

const arrayifySlidesObject = (slides, slideType) => {
    const slideKeys = Object.keys(slides).sort();
    let slideArray = [];
    for (let i=0; i<slideKeys.length;i++) {
        const slide = slides[slideKeys[i]];
        slideArray.push({
            [slideType]: slideArray.length,
            start: slide.start,
            end: slide.end
        });
    }
    return slideArray;
}

export const convertToMillisecondsAndTrimState = (state, numFrames) => {
    trimStateAndArrayify(state);
    traverseAndConvertToMilliseconds(state, numFrames);
}