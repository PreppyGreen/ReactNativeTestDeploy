import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';

export default function BarcodeScan() {
  const [isTorchOn, setIsTorchOn] = useState(false);
  const camera = useRef(null);

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        flashMode={
          isTorchOn
            ? RNCamera.Constants.FlashMode.on
            : RNCamera.Constants.FlashMode.off
        }
        onBarCodeRead={onBarCodeRead}
        ref={camera}>
					<BarcodeMask />
      </RNCamera>

    </View>
  );
}
function onBarCodeRead(e: any) {
  Alert.alert('Barcode value is' + e.data, 'Barcode type is' + e.type);
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
