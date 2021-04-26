import React, { useState } from 'react'
import { StyleSheet, Text, Image, View, Platform, Alert } from 'react-native'
import { SvgFromUri } from 'react-native-svg'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { useNavigation, useRoute } from '@react-navigation/native'
import DateTimePicker, { Event } from '@react-native-community/datetimepicker'
import { format, isBefore } from 'date-fns'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { PlantProps, savePlant } from '../lib/storage'

import Button from '../components/Button'

import waterdrop from '../assets/waterdrop.png'

import colors from '../styles/colors'
import fonts from '../styles/fonts'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface RouteParams {
  plant: PlantProps
}

function PlantSave() {
  const route = useRoute()
  const navigation = useNavigation()

  const { plant } = route.params as RouteParams

  const [selectedDateTime, setSelectedDateTime] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios')


  function handleChangeTime(event: Event, dateTime?: Date) {
    if (Platform.OS === 'android') {
      setShowDatePicker(oldValue => !oldValue)
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date())
      Alert.alert('Selecione uma hora no futuro')
      return
    }

    if (dateTime) {
      setSelectedDateTime(dateTime)
    }
  }

  function handleOpnDateTimePickerForAndroid() {
    setShowDatePicker(oldValue => !oldValue)
  }

  async function handleOnSavePlantButtonPress() {

    const newPlant = {
      ...plant,
      dateTimeNotification: selectedDateTime
    }

    await savePlant(newPlant)

    navigation.navigate('Confirmation', {
      title: 'Tudo certo',
      subTitle: 'Fique tranquilo pois vamos te lembrar de aguar suas plantas',
      buttonTitle: 'Muito obrigado',
      icon: 'hug',
      nextScreen: 'MyPlants'
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.plantInfo}>

        <SvgFromUri
          uri={plant.photo}
          height={150}
          width={150}
        />

        <Text style={styles.plantName}>
          {plant.name}
        </Text>

        <Text style={styles.plantAbout}>
          {plant.about}
        </Text>

      </View>

      <View style={styles.controller}>

        <View style={styles.tipContainer}>
          <Image
            source={waterdrop}
            style={styles.tipImage}
          />

          <Text style={styles.tipText}>
            {plant.water_tips}
          </Text>

        </View>

        <Text style={styles.alertLabel}>
          Escolha o melhor horário para ser lembrado
        </Text>

        {showDatePicker &&
          <DateTimePicker
            value={selectedDateTime}
            mode="time"
            display="spinner"
            onChange={handleChangeTime}
          />
        }

        {
          Platform.OS === 'android' && (
            <TouchableOpacity onPress={handleOpnDateTimePickerForAndroid} style={styles.dateTimePicker}>
              <Text style={styles.dateTimePickerText}>
                {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
              </Text>
            </TouchableOpacity>
          )
        }

        <Button
          title="Cadastrar planta"
          onPress={handleOnSavePlantButtonPress}
        />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape
  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape
  },
  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20
  },
  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15
  },
  plantAbout: {
    textAlign: 'center',
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    marginTop: 10
  },
  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    bottom: 60
  },
  tipImage: {
    width: 56,
    height: 56
  },
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
    textAlign: 'justify'
  },
  alertLabel: {
    textAlign: 'center',
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    marginBottom: 5
  },
  dateTimePicker: {
    width:'100%',
    alignItems: 'center',
    paddingVertical: 40
  },
  dateTimePickerText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text
  }
})

export default PlantSave