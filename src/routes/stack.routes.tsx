import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import TabRoutes from './tab.routes'

import Confirmation from '../pages/Confirmation'
import UserIdentification from '../pages/UserIdentification'
import Welcome from '../pages/Welcome'
import PlantSave from '../pages/PlantSave'
import MyPlants from '../pages/MyPlants'

import colors from '../styles/colors'

const stack = createStackNavigator()

function StackRoutes() {
  return (
    <stack.Navigator
      initialRouteName="Welcome"
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.background
        }
      }}
    >
      <stack.Screen
        name="Welcome"
        component={Welcome}
      />
      <stack.Screen
        name="UserIdentification"
        component={UserIdentification}
      />
      <stack.Screen
        name="Confirmation"
        component={Confirmation}
      />

      <stack.Screen
        name="PlantSelection"
        component={TabRoutes}
      />

      <stack.Screen
        name="PlantSave"
        component={PlantSave}
      />

      <stack.Screen
        name="MyPlants"
        component={TabRoutes}
      />
    </stack.Navigator>
  )
}

export default StackRoutes