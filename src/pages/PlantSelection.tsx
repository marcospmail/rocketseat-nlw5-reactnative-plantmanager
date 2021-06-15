import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, ActivityIndicator, StyleSheet, View, Text } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import EnvironmentButton from '../components/EnvironmentButton'

import { PlantProps } from '../lib/storage'

import api from '../services/api'

import Header from '../components/Header'
import Load from '../components/Load'
import PlantCardPrimary from '../components/PlantCardPrimary'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface EnvinromentProps {
  key: string
  title: string
}

function PlantSelection() {
  const navigation = useNavigation()

  const [environments, setEnvironments] = useState<EnvinromentProps[]>([])
  const [plants, setPlants] = useState<PlantProps[]>([])
  const [environmentSelected, setEnvironmentSelected] = useState('all')
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(true)
  const [loadedAll, setLoadedAll] = useState(false)

  useEffect(() => {
    async function fetchEnvironment() {
      const { data } = await api.get<EnvinromentProps[]>('plants_environments?_sort=title&_order=asc')

      setEnvironments([
        {
          key: 'all',

          title: 'Todos'
        },
        ...data
      ])

      setLoading(false)
    }

    fetchEnvironment()
  }, [])


  useEffect(() => {
    fetchPlants()
  }, [page])

  async function fetchPlants() {
    const { data } = await api.get<PlantProps[]>(`plants?_sort=name&_order=asc&_page=${page}&_limit=6`)

    if (!data.length) {
      setLoadedAll(true)
      setLoadingMore(false)
      return
    }

    setPlants(oldData => [...oldData, ...data])
    setFilteredPlants(oldData => [...oldData, ...data])

    setLoadingMore(false)
  }

  function handleLoadMore(distanceFromEnd: number) {
    if (loadingMore || distanceFromEnd < 1) {
      return
    }

    setLoadingMore(true)

    if (loadedAll) {
      fetchPlants()

    } else {
      setPage(oldData => ++oldData)
    }
  }

  function handleOnEnvironmentSelected(environmentKey: string) {
    setEnvironmentSelected(environmentKey)

    if (environmentKey === 'all') {
      setFilteredPlants(plants)
      return
    }

    const filteredPlants = plants.filter(plant =>
      plant.environments.includes(environmentKey))

    setFilteredPlants(filteredPlants)
  }

  function handleOnPlantSelect(plant: PlantsProps) {
    navigation.navigate('PlantSave', { plant })
  }

  if (loading) {
    return <Load />
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Header />

        <Text style={styles.title}>
          Em qual ambiente
        </Text>

        <Text style={styles.subtitle}>
          você quer colocar sua planta?
        </Text>

      </View>

      <View>
        <FlatList
          data={environments}
          keyExtractor={(item) => item.key}
          renderItem={({ item }: { item: EnvinromentProps }) => (
            <EnvironmentButton
              title={item.title}
              style={{ marginLeft: 5 }}
              active={item.key === environmentSelected}
              onPress={() => handleOnEnvironmentSelected(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: { item: PlantProps }) => (
            <PlantCardPrimary data={item}
              onPress={() => { handleOnPlantSelect(item) }}
            />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) => handleLoadMore(distanceFromEnd)}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator color={colors.green_dark} />
            ) : <View style={{ height: 20 }} />}
        />
      </View>

    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.white
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 38,
    marginTop: 15
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading
  },
  button: {
    width: '100%',
    marginTop: 20
  },
  environmentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginVertical: 32
  },
  plants: {
    flex: 1
  }
})

export default PlantSelection