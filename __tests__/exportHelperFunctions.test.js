import { convertToMilliseconds } from '../app/utilities/exportHelperFunctions';
import { arrayifySlidesObject,arrayifyLevelsObject } from '../app/utilities/exportHelperFunctions';
import { createDefaultLevelsObject,createDefaultBranchesObject } from '../app/utilities/defaults';
import { traverseAndConvertToMilliseconds } from '../app/utilities/exportHelperFunctions';

describe('Millisecond Conversions', () => {
	it('is very beginning of video', () => {
    	expect(convertToMilliseconds("00:00.01", 24)).toBe("00:00.000");
  	});

  	it('defaults to beginning of video when numFrames is 0', () => {
    	expect(convertToMilliseconds("00:00.01", 0)).toBe("number of frames must be a positive integer");
  	});

  	it('defaults to beginning of video when numFrames is negative', () => {
    	expect(convertToMilliseconds("00:00.01", -2)).toBe("number of frames must be a positive integer");
  	});

  	it('milliseconds to be 042 for 2nd frame at 24 FPS', () => {
    	expect(convertToMilliseconds("00:00.02", 24)).toBe("00:00.042");
  	});

  	it('milliseconds to be 039 for 2nd frame at 26 FPS', () => {
    	expect(convertToMilliseconds("00:00.02", 26)).toBe("00:00.039");
  	});


  	it('milliseconds to be 193 for 6th frame at 26 FPS', () => {
    	expect(convertToMilliseconds("00:00.06", 26)).toBe("00:00.193");
  	});
});

describe('Arrayifiction',()=> {
	it('it should turn slides object into array', () => {
		const slides = {
			0: {start: "00:00.01",
				end: "00:00.01"},
			4: {start: "00:00.01",
				end: "00:00.01"},
			2: {start: "00:00.01",
				end: "00:00.01"}
		};

		const expectedSlidesArray = [
			{slide: 1,start: "00:00.01",end: "00:00.01"},
			{slide: 2,start: "00:00.01",end: "00:00.01"},
			{slide: 3,start: "00:00.01",end: "00:00.01"},

		];

		expect(arrayifySlidesObject(slides, "slide")).toEqual(expectedSlidesArray);

	});

	it('it should turn credits object into array', () => {
		const credits = {
			7: {start: "00:00.01",
				end: "00:03.01"},
			2: {start: "10:00.01",
				end: "00:00.01"}
		};

		const expectedCreditsArray = [
			{credit: 1,start: "10:00.01",end: "00:00.01"},
			{credit: 2,start: "00:00.01",end: "00:03.01"}
		];

		expect(arrayifySlidesObject(credits, "credit")).toEqual(expectedCreditsArray);
	});

	it('it should turn levels object into array', () => {
		const levels = createDefaultLevelsObject(3);
		const expectedCreditsArray = [
			{
				level: 1,
				start: "00:00.01",
				end: "00:00.01",
				branches: createDefaultBranchesObject()
			},
			{
				level: 2,
				start: "00:00.01",
				end: "00:00.01",
				branches: createDefaultBranchesObject()
			},
			{
				level: 3,
				start: "00:00.01",
				end: "00:00.01",
				branches: createDefaultBranchesObject()
			},
		];

		expect(arrayifyLevelsObject(levels)).toEqual(expectedCreditsArray);
	});
});

describe("Traversal", () => {
	it('should traverse an object and convert timestamps to ms', () => {
		let objectWithStartsAndEnds = {
			start: "00:23.23",
			end: "10:13.01",
			layer: {
				start: "00:00.04",
				end: "00:02.21",
				layer: {
					start: "00:00.04",
					end: "00:02.21",
					random: true
				},
				another: {
					random: false
				}
			}
		};

		const expectedArray = {
			start: "00:23.917",
			end: "10:13.000",
			layer: {
				start: "00:00.125",
				end: "00:02.834",
				layer: {
					start: "00:00.125",
					end: "00:02.834",
					random: true
				},
				another: {
				random: false
			}
		}
		};

		traverseAndConvertToMilliseconds(objectWithStartsAndEnds, 24);
		expect(objectWithStartsAndEnds).toEqual(expectedArray);
	});

});

















