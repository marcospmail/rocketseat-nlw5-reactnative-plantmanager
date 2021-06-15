import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialIcons } from '@expo/vector-icons'

import PlantSelection from '../pages/PlantSelection'
import MyPlants from '../pages/MyPlants'

import colors from '../styles/colors'
import { Platform } from 'react-native'

const tab = createBottomTabNavigator()

function TabRoutes() {
  return (
    <tab.Navigator
      initialRouteName="Minhas Plantas"
      screenOptions={{
        unmountOnBlur: true
      }}
      tabBarOptions={{
        activeTintColor: colors.green,
        inactiveTintColor: colors.heading,
        labelPosition: 'beside-icon',
        style: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 88
        },

      }}
    >

      <tab.Screen
        name="Nova Planta"
        component={PlantSelection}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="add-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <tab.Screen
        name="Minhas Plantas"
        component={MyPlants}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          )
        }}
      />



    </tab.Navigator>
  )
}

export default TabRoutes