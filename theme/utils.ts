import { Dimensions, ActivityIndicator } from 'react-native';

const { height, width } = Dimensions.get("window")

export const SCREEN_HEIGHT = height,
	SCREEN_WIDTH = width;

function percentage(aspect: 'height' | 'width') {
	return function calculatePercentage(val: number): number {
		const screenAspect = aspect == 'height' ? SCREEN_HEIGHT : SCREEN_WIDTH;
		return (val / 100) * screenAspect;
	}
}

export const percentageHeight = percentage('height'),
	percentageWidth = percentage('width');
