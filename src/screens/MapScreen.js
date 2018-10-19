import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import MapView, {Marker} from 'react-native-maps';

import ATM_POSITION from '../constants/slsp_atms.json';

export class MapScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPosition: null,
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
          this.setState({currentPosition: position})
        });
    }
  
    getATMPositions = ()  => {
        return ATM_POSITION.map((atmObject) => {
            return {
            name: atmObject.address.street,
            location: atmObject.location
            }
        })
    }

    render() {
        if (this.state.currentPosition === null) {
            return (<Text>
              Loading...
            </Text>);
          }
        return (
            <View style={styles.container}>
              <MapView
                style={styles.map}
                initialRegion={{
                    latitude: this.state.currentPosition.coords.latitude,
                    longitude: this.state.currentPosition.coords.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.0421,
                }}
                showsCompass={true}
              >
                <Marker 
                  coordinate={this.state.currentPosition.coords} 
                  pinColor={'blue'}/>
                {this.getATMPositions().map((atm) => {
                  return (
                    <Marker 
                      coordinate={atm.location}
                      key={atm.name}
                      pinColor={'red'} />
                  );
                })}
              </MapView>
      
              <Button 
                title='AR'
                onPress={this.props.onSwitch}>
              </Button>
              
         </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
     flex: 1,
     justifyContent: 'flex-end',
     alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });