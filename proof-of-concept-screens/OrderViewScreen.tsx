import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { StyleContext } from '../theme/StyleContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SUCCESS_GREEN } from '../theme/colors';
import { percentageWidth, percentageHeight } from '../theme/utils';
import { NavigationStackProp } from 'react-navigation-stack';
import Reactotron from 'reactotron-react-native';
import { OrderType } from '../types/order';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NEW, ACCEPTED, READY_FOR_COLLECTION, COLLECTED } from '../constants';
import { fetchOrder } from '../utils';

const DOT_SIZE = 40;
const LINE_WIDTH = 3;
export default function OrderViewScreen({
  navigation,
}: {
  navigation: NavigationStackProp<{
    order: OrderType;
  }>;
}) {
	Reactotron.log('nav props are', navigation.getParam('order'));
  const order: OrderType = navigation.getParam('order');

	const refreshPage = async () => {
		try {
			const newestOrder = await fetchOrder(order.id);
			Reactotron.log('Refresh page', { newestOrder })
			navigation.navigate('OrderView', { order: newestOrder })
		} catch (e) {
			Reactotron.warn(e);
		}
	}
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
			<Button title="Refresh"
				type="solid"
				onPress={refreshPage}
			/>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '10%',
        }}>
        <ProgressSection
          completed={orderStatus(NEW, order.orderStatus)}
          text="Sent to pharmacy"
        />
        <Line />
        <ProgressSection
          completed={orderStatus(ACCEPTED, order.orderStatus)}
          text="Approved"
        />
        <Line />
        <ProgressSection
          completed={orderStatus(READY_FOR_COLLECTION, order.orderStatus)}
          text="Ready for collection"
        />
        <Line />
        <ProgressSection
          completed={orderStatus(COLLECTED, order.orderStatus)}
          text="Collected"
        />
      </View>
      <Button
        type="solid"
        title="Go back to the landing page"
        onPress={() => navigation.replace('Landing')}
      />
    </SafeAreaView>
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
    <View
      style={{
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

function orderStatus(status: string, value: string) {
  const statuses = [NEW, ACCEPTED, READY_FOR_COLLECTION, COLLECTED];
  if (statuses.indexOf(value) >= statuses.indexOf(status)) return true;
  return false;
}
