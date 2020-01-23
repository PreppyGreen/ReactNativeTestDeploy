import React from 'react';
import { Button } from 'react-native';

import renderer from 'react-test-renderer';

function MyButton() {
	return <Button title="My Button" onPress={() => {}} />
}


describe('Button component', () => {
	test('it renders correctly', () => {
		renderer.create(<MyButton />);
	})
})
