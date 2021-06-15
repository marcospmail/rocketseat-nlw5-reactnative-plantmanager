import AsyncStorage from '@react-native-async-storage/async-storage'
import { addDays, isBefore } from 'date-fns'
import * as Notifications from 'expo-notifications'

export interface PlantProps {
  id: number,
  name: string,
  about: string
  water_tips: string
  photo: string
  environments: string[]
  frequency: {
    times: number,
    repeat_every: string
  },
  dateTimeNotification: Date
  notificationId: string
}

export async function savePlant(plant: PlantProps): Promise<void> {
  try {
    const nextTime = new Date(plant.dateTimeNotification)
    const now = new Date()

    const { times, repeat_every } = plant.frequency
    if (repeat_every === 'week') {
      const interval = Math.trunc(7 / times)
      nextTime.setDate(now.getDate() + interval)
    }
    else if (isBefore(nextTime, now)) {
      nextTime.setDate(now.getDate() + 1)
    }

    const seconds = Math.abs(Math.ceil(now.getTime() - nextTime.getTime()) / 1000)

    const trigger = new Date(Date.now());
    trigger.setSeconds(seconds);

    await Notifications.cancelScheduledNotificationAsync(String(plant.id))

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'PlantManager',
        body: `Está na hora de cuidar da sua ${plant.name}`,
      },
      trigger,
      identifier: String(plant.id)
    })

    const oldPlants = await loadPlants()

    const newPlant = {
      ...plant,
      notificationId
    }

    const plantIndex = oldPlants.findIndex(v => v.id === plant.id)
    const alreadyHasPlant = plantIndex >= 0
    let updatedPlants = [...oldPlants]

    if (alreadyHasPlant) {
      updatedPlants[plantIndex] = newPlant
    } else {
      updatedPlants.push(newPlant)
    }

    await AsyncStorage.setItem('@plantmanager:plants', JSON.stringify(updatedPlants))

  }
  catch (err) {
    throw new Error('Falha ao adicionar planta')
  }
}


export async function removePlant(plant: PlantProps): Promise<PlantProps[]> {
  try {
    const oldPlants = await loadPlants()
    const updatedPlants = oldPlants.filter(oldPlant => oldPlant.id !== plant.id)
    await AsyncStorage.setItem('@plantmanager:plants', JSON.stringify(updatedPlants))

    // Notifications.cancelScheduledNotificationAsync(plant.notificationId)

    return updatedPlants

  }
  catch (err) {
    throw new Error('Falha ao remover planta')
  }
}

export async function loadPlants(): Promise<PlantProps[]> {
  try {
    const data = await AsyncStorage.getItem('@plantmanager:plants')

    let plants = (data ? JSON.parse(data) : []) as PlantProps[]

    plants = plants.map(v => ({
      ...v,
      dateTimeNotification: new Date(v.dateTimeNotification)
    }))

    return plants.sort((first, second) => {
      const firstDateTimeNotification = first.dateTimeNotification.getTime()
      const secondDateTimeNotification = second.dateTimeNotification.getTime()

      return firstDateTimeNotification - secondDateTimeNotification
    })
  }
  catch (err) {
    throw err
  }
}
