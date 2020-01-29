import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { StyleContext } from '../theme/StyleContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SUCCESS_GREEN } from '../theme/colors';
import { percentageWidth, percentageHeight } from '../theme/utils';

const DOT_SIZE = 40;
const LINE_WIDTH = 3;
export default function OrderViewScreen() {

  return (
    <View
      style={{
				flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '10%',
      }}>
      <ProgressSection completed={true} text="Sent to pharmacy" />
      <Line />
      <ProgressSection completed={false} text="Approved" />
      <Line />
      <ProgressSection completed={false} text="Ready for collection" />
      <Line />
      <ProgressSection completed={false} text="Collected" />
    </View>
  );
}

function ProgressSection({ completed, text }: any) {
  const styleContext = useContext(StyleContext);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View style={{ marginRight: percentageWidth(10) }}>
        <ProgressDot completed={completed} />
      </View>
      <Text style={styleContext.title}>{text}</Text>
    </View>
  );
}

function Line() {
  return (
    <View style={{
			paddingLeft: DOT_SIZE / 2 - LINE_WIDTH * 1.5,
		}}>
      <View
        style={{
          height: percentageHeight(10),
          borderLeftWidth: LINE_WIDTH,
          borderLeftColor: 'grey',
          marginTop: percentageHeight(2.5),
          marginBottom: percentageHeight(2.5),
        }}
      />
    </View>
  );
}
function ProgressDot({ completed }: { completed: boolean }) {
  const color = completed ? SUCCESS_GREEN : 'grey';
  return <Icon name="circle" size={DOT_SIZE} color={color} />;
}
