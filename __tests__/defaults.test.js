import { defaultValues, createDefaultLevelsObject, createDefaultBranch, createDefaultBranchesObject } from '../app/utilities/defaults';

describe('Default Branches Setup', () => {
	it('is defaulted to first frame of video', () => {
    	expect(defaultValues.time).toBe("00:00.01");
  	});


  	it('creates a branch properly', () => {
  		const expectedBranch = {
			start: "00:00.01",
			end: "00:00.01",
			enabled: true,
			outcome: "0" 
  		};

    	expect(createDefaultBranch()).toEqual(expectedBranch);
  	});

  	it('creates an object with 6 emotion branches', () => {
  		const defaultBranch = {
  			start: "00:00.01",
			end: "00:00.01",
			enabled: true,
			outcome: "0" 
  		};

  		const expected = {
  			"Anger": defaultBranch,
  			"Fear": defaultBranch,
  			"Calm": defaultBranch,
  			"Disgust": defaultBranch,
  			"Contempt": defaultBranch,
  			"Surprise": defaultBranch
  		};

    	expect(createDefaultBranchesObject()).toEqual(expected);
  	});

});

describe('Default Levels Setup', () => {
	it ('is expected to create an empty object', () => {
		expect(createDefaultLevelsObject(0)).toEqual({});
	});

	it ('is expected to return empty object with negative input', () => {
		expect(createDefaultLevelsObject(-3)).toEqual({});
	});

	it('is expected to create an object with one level', () => {
		const oneLevel = {
			1: {
				level: 1,
				start: "00:00.01",
				end: "00:00.01",
				branches: createDefaultBranchesObject()
			}
		};

    	expect(createDefaultLevelsObject(1)).toEqual(oneLevel);
  	});

  	it('is expected to create an object with 3 levels', () => {
		const threeLevels = {
			1: {
				level: 1,
				start: "00:00.01",
				end: "00:00.01",
				branches: createDefaultBranchesObject()
				},
			2: {
				level: 2,
				start: "00:00.01",
				end: "00:00.01",
				branches: createDefaultBranchesObject()
				},
			3: {
				level: 3,
				start: "00:00.01",
				end: "00:00.01",
				branches: createDefaultBranchesObject()
				}
		};

    	expect(createDefaultLevelsObject(3)).toEqual(threeLevels);
  	});
});