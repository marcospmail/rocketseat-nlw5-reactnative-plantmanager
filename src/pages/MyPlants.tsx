import { FlatList } from 'react-native-gesture-handler';
import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Image, Text, Alert } from "react-native";
import { formatDistance, isAfter, isBefore } from 'date-fns';
import { pt } from 'date-fns/locale';

import Header from '../components/Header';
import PlantCardSecondary from '../components/PlantCardSecondary';
import Load from '../components/Load';

import { loadPlants, PlantProps, removePlant as removePlantFromStorage } from '../lib/storage';

import waterdrop from '../assets/waterdrop.png'

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useFocusEffect } from '@react-navigation/native';

function MyPlants() {
  const [plants, setPlants] = useState<PlantProps[]>([])
  const [nextPlantToWaterText, setNextPlantToWaterText] = useState('')

  const [loading, setLoading] = useState(true)

  const timer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    async function fetchNextWaterTime() {
      const plants = await loadPlants()
      setPlants(plants)
      setLoading(false)
    }

    fetchNextWaterTime()

    return () => {
      if (timer.current) {
        clearTimeout(timer.current)
      }
    }
  }, [])

  useEffect(() => {
    calculateRemainingTimeToWaterPlant()
  }, [plants])
  

  useFocusEffect(() => {
    startCalculateWaterTimer()
  })

  function startCalculateWaterTimer() {
    timer.current = setTimeout(() => {
      calculateRemainingTimeToWaterPlant()
      startCalculateWaterTimer()
    }, 36000)
  }

  function calculateRemainingTimeToWaterPlant() {
    const now = new Date()
    const nextPlantsToWater = plants.filter(plant => {
      isAfter(plant.dateTimeNotification, now)
    })

    const nextPlantToWater = nextPlantsToWater.length > 0 ? nextPlantsToWater[0] : plants[0]

    if (nextPlantToWater) {
      if (isBefore(nextPlantToWater.dateTimeNotification, now)) {
        nextPlantToWater.dateTimeNotification.setDate(nextPlantToWater.dateTimeNotification.getDate() + 1)
      }

      const nextPlantToWaterText = formatDistance(
        new Date(nextPlantToWater.dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }
      )

      setNextPlantToWaterText(nextPlantToWaterText)
    }
  }

  async function removePlant(plant: PlantProps) {
    const updatedPlants = await removePlantFromStorage(plant)
    setPlants(updatedPlants)
  }

  function handleOnRemovePlantButtonPress(plant: PlantProps) {
    Alert.alert('Remover', `Deseja remover a ${plant.name}`, [
      {
        text: 'Não',
        style: 'cancel'
      },
      {
        text: 'Sim',
        onPress: () => removePlant(plant)
      }

    ])
  }

  if (loading) {
    return <Load />
  }

  return (
    <View style={styles.container}>
      <Header />

      {!!nextPlantToWaterText && (
        <View style={styles.spotlight}>

          <Image source={waterdrop} style={styles.spotlightImage} />

          <Text style={styles.spotlightText}>
            {`${nextPlantToWaterText} para regar a próxima planta`}
          </Text>

        </View>

      )}
      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>
          Próximas regadas
        </Text>

        {!!nextPlantToWaterText ?
          (
            <FlatList
              data={plants}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }: { item: PlantProps }) => (
                <PlantCardSecondary
                  plant={item}
                  handleRemove={() => { handleOnRemovePlantButtonPress(item) }}
                />
              )}
              showsVerticalScrollIndicator={false}
            />
          )
          : (
            <View style={styles.noPlantsRegisteredWrapper}>
              <Text style={styles.noPlantsRegistered}>
                Você ainda não cadastrou nenhuma planta
              </Text>
            </View>
          )
        }

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  spotlightImage: {
    width: 60,
    height: 60
  },
  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
    textAlign: 'justify'
  },
  plants: {
    flex: 1,
    width: '100%'
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20
  },
  noPlantsRegisteredWrapper: {
    justifyContent: 'center',
    flex: 1,
  },
  noPlantsRegistered: {
    fontSize: 18,
    width: '80%',
    fontFamily: fonts.heading,
    color: colors.heading,
    textAlign: 'center',
    alignSelf: 'center',
  }
})

export default MyPlants


