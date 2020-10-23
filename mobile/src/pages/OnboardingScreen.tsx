import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import Onboarding, { DotProps } from 'react-native-onboarding-swiper'
import { Feather } from '@expo/vector-icons'

import OnboardingOne from '../images/onboarding/onboardingOne'
import OnboardingTwo from '../images/onboarding/onboardingTwo'
import { useNavigation } from '@react-navigation/native';

export default function OnboardingScreen() { 
  const navigation = useNavigation();

  const Dots = ({selected}: DotProps) => {

    let backgroundColor = selected ? '#FFD152' : '#BECFD8'
    let width = selected ? 16 : 8


    return (
      <View style={{
        width,
        height:4,
        backgroundColor,
        marginHorizontal:3,
        borderRadius:4
      }} />
    );
  }

  const Skip = ({...props}) => {
    return null;
  }
  
  const Done = ({...props}) => {
    return (
      <TouchableOpacity {...props} style={{
        width:56,
        height:56,
        backgroundColor:'#D1EDF2',
        marginHorizontal:10,
        marginVertical:10,
        borderRadius:20,
        justifyContent: 'center',
        alignItems:'center'
      }} >
        <Feather name="arrow-right" size={26} color="#15B6D6" />
      </TouchableOpacity>
    );
  }

  return (
    <Onboarding     
    showSkip={false}
    DoneButtonComponent={Done}
    NextButtonComponent={Done}
    DotComponent={Dots}
    bottomBarHighlight={false}
    bottomBarHeight={80}
    onSkip={() => navigation.navigate('OrphanagesMap')}
    pages={[
      {
        backgroundColor: '#F2F3F5',
        image: <OnboardingOne />,
        title: <Text style={styles.titleOne}>Leve felicidade para o mundo</Text>,
        subtitle: <Text style={styles.subtitle}>Visite orfanatos e mude o dia de muitas crianças.</Text>
      },
      {
        backgroundColor: '#F2F3F5',
        image: <OnboardingTwo />,
        title: <Text style={styles.titleTwo}>Leve felicidade para o mundo</Text>,
        subtitle: ''
      },
    ]} />
  );
}

const styles = StyleSheet.create({
  titleOne: {
    color:'#0089A5',
    fontFamily:'Nunito_800ExtraBold',
    fontSize:35,
    lineHeight:35,
    width:220,
    marginTop:-30
  },
  titleTwo: {
    color:'#0089A5',
    fontFamily:'Nunito_800ExtraBold',
    fontSize:35,
    lineHeight:35,
    paddingRight:40,
    width:253,
    textAlign:'right'
  },
  subtitle: {
    color:'#5C8599',
    fontFamily:'Nunito_600SemiBold',
    fontSize:15,
    lineHeight:20,
    paddingLeft:10,
    marginTop:10,
    width:234
  }
})