import React from 'react';

import { ActivityIndicator } from 'react-native';

export default function LoadingSpinner({
	color
}: {
	color?: any;
}) {
	color = color || 'white';
	return (
		<ActivityIndicator color={color} />
	)
}
