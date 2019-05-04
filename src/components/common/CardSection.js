import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
  // cool react native trick: style most to the right will overwrite any style
  // to the left when you pass an array into the style prop
  return (
    <View style={[styles.containerStyle, props.style]}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
};

export { CardSection };
