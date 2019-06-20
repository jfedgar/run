import React from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { Stopwatch } from 'react-native-stopwatch-timer';
import Clock from '../../assets/images/clock2x.png';
import Location from '../../assets/images/location2x.png';
import { setTime } from '../actions';

const TripInfoBar = ({ running, distance, startTime, setTime }) => {
  return (
    <View style={styles.outerContainer}>

      <View style={[styles.columnContainer, { marginLeft: '4%', width: '96%' }]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'flex-start',
            borderWidth: 1,
          }}
        >
          <Image
            source={Location}
            style={{ resizeMode: 'contain', width: '20%', height: 37 }}
          />
          <Text style={{ fontSize: 25, fontFamily: 'poppins-semi-bold' }}>{distance}</Text>
        </View>
        <View style={{ fontFamily: 'poppins-extra-light' }}><Text>total distance</Text></View>
      </View>

      <View style={[styles.columnContainer]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1
          }}
        >
          <Image
            source={Clock}
            style={{ resizeMode: 'contain', width: '18%', height: 34 }}
          />
          <Stopwatch
            options={styles.stopWatchOptions}
            start={running}
            reset={running === false && startTime === null}
            getTime={setTime}
          />
        </View>
        <View style={{}}><Text>total time</Text></View>
      </View>
    </View >
  );
};

const styles = {
  outerContainer: {
    height: '25%',
    borderWidth: 1,
    borderColor: 'red',
    flexDirection: 'row',
  },
  columnContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  stopWatchOptions: {
    container: {
      backgroundColor: '#fff',
      width: '75%',
    },
    text: {
      fontSize: 25,
      color: '#000',
      marginLeft: 3,
      fontFamily: 'poppins-semi-bold'

    }
  }
};

// some ugly nested destructuring so I don't have to include all trip properties in the props
// is there a better way to do this?
const mapStateToProps = ({ trip: { running, distance, startTime } }) => {
  return { running, distance, startTime };
};

export default connect(mapStateToProps, { setTime })(TripInfoBar);
