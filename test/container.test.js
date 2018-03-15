import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from "/Users/mrngo/Desktop/storyline-manager/app/index.js";
import renderer from 'react-test-renderer';

test('start should be 00:00.000', () => {
	const component = renderer.create(
		<Container numLevels={4} />
	)

	let tree = component.toJSON();
	expect(tree.numLevels).toBe(4);
	// expect(tree.createDefaultBranch()).toBe({
	// 	        start: "00:00.000",
	// 	        end: "00:00.000",
	// 	        enabled: true,
	// 	        outcome: null
 //    });
});