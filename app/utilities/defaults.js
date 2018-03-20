export const defaultValues = {
    time: "00:00.01",
    enabled: true,
    video: "src/main/resources/video/film_with_credits.m4v",
    audio: "src/main/resources/audio/audio.wav"
}

const createDefaultBranch = () => {
    return {
        start: defaultValues.time,
        end: defaultValues.time,
        enabled: defaultValues.enabled,
        outcome: "Credits"
    };
}

const createDefaultBranchesObject = () => {
    const emotions = ["Anger", "Fear", "Calm", "Disgust", "Contempt", "Surprise"];
    
    let branches = {}
    emotions.forEach((emotion) => branches[emotion] = createDefaultBranch());
    return branches;
}

export const createDefaultLevelsObject = (numLevels) => {
    const populatedLevels = {};

    for (let i = 1; i <= numLevels; i++) {
        populatedLevels[i] =  {
            level: i,
            start: defaultValues.time,
            end: defaultValues.time,
            branches: createDefaultBranchesObject()
        };
    }

    console.log(populatedLevels);
    return populatedLevels;
}