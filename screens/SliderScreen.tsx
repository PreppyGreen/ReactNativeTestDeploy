import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

export default function SliderScreen() {
  return (
    <AppIntroSlider
      renderItem={({ item: { key, title, text, backgroundColor } }: any) => (
        <Slide
          key={key}
          backgroundColor={backgroundColor}
          title={title}
          text={text}
        />
      )}
      showSkipButton={false}
      slides={slides}
    />
  );
}

function Slide({ key, title, text, backgroundColor }: any) {
  return (
    <View
      style={{
        backgroundColor,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}
const slides = [
  {
    key: 'first page',
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    backgroundColor: '#DAF7A6',
  },
  {
    key: 'second page',
    title: 'Title 2',
    text: 'Description.\nSay something cool',
    backgroundColor: '#FFC300',
  },
  {
    key: 'third page',
    title: 'Title 3',
    text: 'Description.\nSay something cool',
    backgroundColor: '#FF5733',
  },
  {
    key: 'fourth page',
    title: 'Title 4',
    text: 'Description.\nSay something cool',
    backgroundColor: '#C70039 ',
  },
];

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    color: 'black',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
});
