import React, { useRef, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import { NavigationStackProp } from 'react-navigation-stack';

export default function BarcodeScan({
	navigation
}: {
	navigation: NavigationStackProp
}) {
	const camera = useRef(null);
	function onBarCodeRead(barcode: {
		data: any;
		type: any;
	}) {
		navigation.navigate('BarcodeValue', { barcode });
	}
  return (
    <View style={styles.container}>
      <RNCamera
				captureAudio={false}
        style={styles.preview}
        onBarCodeRead={onBarCodeRead}
        ref={camera}>
					<BarcodeMask />
      </RNCamera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cameraIcon: {
    margin: 5,
    height: 40,
    width: 40,
  },
  bottomOverlay: {
    position: 'absolute',
    width: '100%',
    flex: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
