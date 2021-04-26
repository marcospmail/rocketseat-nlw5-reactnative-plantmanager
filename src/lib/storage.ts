import AsyncStorage from "@react-native-async-storage/async-storage"
import { PanGestureHandler } from "react-native-gesture-handler"

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
}

export async function savePlant(plant: PlantProps): Promise<void> {
  try {
    const oldPlants = await loadPlants()

    const plantIndex = oldPlants.findIndex(v => v.id === plant.id)
    const alreadyHasPlant = plantIndex >= 0

    let updatedPlants = [...oldPlants]

    const newPlant = {
      ...plant,
      dateTimeNotification: new Date()
    }

    if (alreadyHasPlant) {
      updatedPlants[plantIndex] = newPlant
    } else {
      updatedPlants.push(newPlant)
    }

    await AsyncStorage.setItem('@plantmanager:plants', JSON.stringify(updatedPlants))

  }
  catch (err) {
    throw err
  }
}

export async function loadPlants(): Promise<PlantProps[]> {
  try {
    const data = await AsyncStorage.getItem('@plantmanager:plants')
    let plants = data ? JSON.parse(data) as PlantProps[] : []

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
