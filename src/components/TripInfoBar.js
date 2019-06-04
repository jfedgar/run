import React from 'react';
import { View, Text, Image } from 'react-native';
import { Stopwatch } from 'react-native-stopwatch-timer';
import Clock from '../../assets/images/clock2x.png';
import Location from '../../assets/images/location2x.png';

const TripInfoBar = ({ running }) => {
  return (
    <View style={styles.containerStyle}>

      <View style={{ flex: 1, flexDirection: 'row', borderWidth: 1, alignItems: 'center' }}>
        <Image
          source={Location}
          style={{ resizeMode: 'contain', width: '12%' }}
        />
        <Text style={{ fontSize: '30' }}>1.67km</Text>
      </View>

      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }} >
        <Image
          source={Clock}
          style={{ resizeMode: 'contain', width: '12%' }}
        />
        <Stopwatch options={styles.stopWatchOptions} start={running} />
      </View>
    </View>

  );
};

const styles = {
  containerStyle: {
    height: '25%',
    borderWidth: 1,
    borderColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  stopWatchOptions: {
    container: {
      backgroundColor: '#fff',
      padding: 5,
      borderRadius: 5,
      width: 220,
    },
    text: {
      fontSize: 30,
      color: '#000',
      marginLeft: 7,
      font: 'nunito-bold'
    }
  }
};

export default TripInfoBar;
