import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Image, Text } from "react-native";
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import { FlatList } from 'react-native-gesture-handler';

import { loadPlants, PlantProps } from '../lib/storage';

import Header from '../components/Header';
import PlantCardSecondary from '../components/PlantCardSecondary';

import waterdrop from '../assets/waterdrop.png'

import colors from '../styles/colors';
import fonts from '../styles/fonts';

function MyPlants() {
  const [plants, setPlants] = useState<PlantProps[]>([])
  const [nextPlantToWaterText, setNextPlantToWaterText] = useState('')

  useEffect(() => {
    async function fetchNextWaterTime() {
      const plants = await loadPlants()
      setPlants(plants)

      const nextPlantToWater = plants[0]

      const nextPlantToWaterText = formatDistance(
        new Date(nextPlantToWater.dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }
      )

      setNextPlantToWaterText(nextPlantToWaterText)
    }

    fetchNextWaterTime()
  }, [])


  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.spotlight}>

        <Image source={waterdrop} style={styles.spotlightImage} />

        <Text style={styles.spotlightText}>
          {`${nextPlantToWaterText} para regar a próxima planta`}
        </Text>

      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>
          Próximas regadas
        </Text>

        <FlatList 
          data={plants}
          keyExtractor={item => String(item.id)}
          renderItem={({item} : { item: PlantProps }) => (
            <PlantCardSecondary plant={item} />
          )}
          showsVerticalScrollIndicator={false}
        />
        
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
  }
})

export default MyPlants