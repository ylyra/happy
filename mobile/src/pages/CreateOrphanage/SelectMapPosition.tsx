import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { MapEvent, Marker } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

import mapMarkerImg from '../../images/map-marker.png';

export default function SelectMapPosition() {
  const navigation = useNavigation();
  const [position, setPosition] = useState({
    latitude:0,
    longitude:0
  });
  const [positionUser, setPositionUser] = useState({
    latitude:-20.6564795,
    longitude:-40.4969006,
  });

  function handleNextStep() {
    navigation.navigate('OrphanageData', { position });
  }

  function handleSelectMapPosition(event: MapEvent) {
    setPosition(event.nativeEvent.coordinate)
    setPositionUser(event.nativeEvent.coordinate)
  }

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if(granted) {
        const { coords } = await getCurrentPositionAsync({
          accuracy: 5,
        });

        
        const { latitude, longitude} = coords
        setPositionUser({
          latitude:latitude,
          longitude:longitude
        });
      }
    }

    loadInitialPosition();

  }, [])

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        onPress={handleSelectMapPosition}
        region={{
        latitude:positionUser.latitude,
        longitude:positionUser.longitude,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
        }} 
        showsUserLocation
      >
        { position.latitude !== 0 && (
          <Marker 
            icon={mapMarkerImg}
            coordinate={{ latitude: position.latitude, longitude: position.longitude }}
          />
        ) }
      </MapView>

      { position.latitude !== 0 && (<RectButton style={styles.nextButton} onPress={handleNextStep}>
        <Text style={styles.nextButtonText}>Próximo</Text>
      </RectButton>) }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
})