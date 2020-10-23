import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import SuccessSvg from '../../images/success-creation/successCreation'

export default function SuccessCreation() {
    const navigation = useNavigation();

    function handleNavigateToOrphanagesMap() {
      navigation.navigate('OrphanagesMap');
    }

    return (
        <View style={styles.container}>
            <SuccessSvg />
            <Text style={styles.header}>Ebaaa!</Text>
            <Text style={styles.description}>O cadastro deu certo e foi enviado ao administrador para ser aprovado. Agora é só esperar :)</Text>

            <RectButton style={styles.btn} onPress={handleNavigateToOrphanagesMap} >
                <Text style={styles.btnText} >Ok</Text>
            </RectButton>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#39CC83',
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
    },

    header: {
        fontSize:40,
        lineHeight: 45,
        color: '#fff',
        fontFamily: 'Nunito_800ExtraBold',
        textAlign:'center',
        marginTop: 32,
    },

    description: {
        fontSize:20,
        lineHeight: 30,
        color: '#fff',
        fontFamily: 'Nunito_600SemiBold',
        textAlign:'center',
        marginTop: 18,
        paddingHorizontal:18
    },

    btn: {
        width:120,
        height:56,
        backgroundColor: '#19C06D',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:20,
        marginTop:24
    },
    btnText: {
        fontSize:15,
        color: '#fff',
        fontFamily: 'Nunito_800ExtraBold',
    }
})