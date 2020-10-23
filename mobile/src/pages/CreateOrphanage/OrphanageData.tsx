import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { FancyAlert } from 'react-native-expo-fancy-alerts';
import { TextInputMask } from 'react-native-masked-text'
import api from '../../services/api';

interface OrphanageDataRouteParams {
  position: {
    latitude:number,
    longitude:number
  }
}

export default function OrphanageData() {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as OrphanageDataRouteParams;
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [whatsapp, setWhatsApp] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<string[]>([]);
  const [phoneField, setPhoneField] = useState<TextInputMask>();

  async function handleCreateOrphanage() {
    const { latitude, longitude } = params.position
    let phoneNumber = '';

    if(phoneField) {
      phoneNumber = `+55${phoneField.getRawValue()}`
    }
    
    const data = new FormData();
    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);    
    data.append('open_on_weekends', String(open_on_weekends));
    data.append('whatsapp', phoneNumber);

    images.forEach((image, index) => {
      data.append('images', { 
        name: `image_${index}.jpg`,
        type: 'image/jpg',
        uri: image,
       } as any);
    })
    
    await api.post('orphanages', data);
    navigation.navigate('SuccessCreation')   
  }

  async function handleSelectImages() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if(status !== 'granted') {
      setVisible(true);     
      return; 
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing:true,
      quality:1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    })

    if(result.cancelled) {
      return
    }

    const  { uri: image } = result;
    
    setImages([...images, image]);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <FancyAlert
        visible={visible}
        onRequestClose={() => {}}
        icon={<View style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#c3272b',
          borderRadius: 50,
          width: '100%',
        }}><Feather name="x" size={24} color="#fff" /></View>}
        style={{ backgroundColor: 'white' }}
      >
        <Text style={styles.contentText}>Eitaa, precisamos de acesso às suas fotos...</Text>
        <TouchableOpacity style={styles.btn} onPress={() => setVisible(false)}>
          <Text style={styles.btnText}>OK</Text>
        </TouchableOpacity>
      </FancyAlert>
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <View style={{flexDirection:'row', justifyContent:'space-between'}} >
        <Text style={styles.label}>Sobre</Text>
        <Text style={styles.maxCaracteres}>Máximo de 300 catacteres</Text>
      </View>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={about}
        onChangeText={setAbout}
      />

      <Text style={styles.label}>Whatsapp</Text>
      <TextInputMask
        type={'cel-phone'}
        options={{
          maskType: 'BRL',
          withDDD: true,
          dddMask: '(99) '
        }}

        style={styles.input}
        value={whatsapp}
        onChangeText={setWhatsApp}
        // add the ref to a local var
        ref={(ref: TextInputMask) => {setPhoneField(ref)}}
      />

      <Text style={styles.label}>Fotos</Text>

      <View style={styles.uploadedImagesContainer}>
        {images.map(image => {
          return (
            <Image key={image} source={{uri: image}} style={styles.uploadedImage} />
          );
        })}
      </View>

      <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={instructions}
        onChangeText={setInstructions}
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput
        style={styles.input}
        value={opening_hours}
        onChangeText={setOpeningHours}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch 
          thumbColor="#fff" 
          trackColor={{ false: '#ccc', true: '#39CC83' }}
          value={open_on_weekends}
          onValueChange={setOpenOnWeekends}
        />
      </View>

      <RectButton style={styles.nextButton} onPress={handleCreateOrphanage}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },

  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },

  maxCaracteres: {
    fontSize:10,
    fontFamily: 'Nunito_600SemiBold',
    lineHeight:20,
    color: '#8FA7B3'
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  },

  contentText: {
    textAlign: 'center',
    paddingHorizontal: 16,
    marginTop: -16, 
    marginBottom: 16
  },
  btn: {
    borderRadius: 32,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    alignSelf: 'stretch',
    backgroundColor: '#c3272b',
    marginTop: 16,
    marginBottom: 16,
    minWidth: '50%',
    paddingHorizontal: 16,
  },
  btnText: {
    color: '#FFFFFF',
  },

  uploadedImagesContainer: {
    flexDirection:'row'
  }, 
  uploadedImage: {
    width:64,
    height:64,
    borderRadius:20,
    marginBottom:32,
    marginRight:8
  }
})