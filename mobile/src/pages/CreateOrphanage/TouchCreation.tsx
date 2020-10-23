import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { MapEvent, Marker } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

import TouchSelection from '../../images/touchSelection'

export default function TouchCreation() {
  const navigation = useNavigation();
  const [positionUser, setPositionUser] = useState({
    latitude:-20.6564795,
    longitude:-40.4969006,
  });

  function handleNextStep() {
    navigation.navigate('SelectMapPosition');
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
        region={{
        latitude:positionUser.latitude,
        longitude:positionUser.longitude,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
        }} 
        showsUserLocation
      >
      </MapView>

      <RectButton style={styles.overlayButton} onPress={handleNextStep}>
        <TouchSelection />
        <Text style={styles.nextButtonText}>Toque no mapa para adicionar um orfanato</Text>
      </RectButton>
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
    fontSize: 24,
    color: '#FFF',
    lineHeight:34,
    textAlign:'center',
    width:203
  },

  overlayButton: {
    backgroundColor: 'rgba(21,182,214,0.75)',
    justifyContent: 'center',
    alignItems: 'center',

    position: 'absolute',
    left: 0,
    right: 0,
    top:0,
    bottom: 0,
  }
})