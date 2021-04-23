import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Confirmation from '../pages/Confirmation'
import UserIdentification from '../pages/UserIdentification'
import Welcome from '../pages/Welcome'
import colors from '../styles/colors'
import PlantSelection from '../pages/PlantSelection'

const stackRoutes = createStackNavigator()

function AppRoutes() {
  return (
    <stackRoutes.Navigator
    initialRouteName="Welcome"
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.background
        }
      }}
    >
      <stackRoutes.Screen
        name="Welcome"
        component={Welcome}
      />
      <stackRoutes.Screen
        name="UserIdentification"
        component={UserIdentification}
      />
      <stackRoutes.Screen
        name="Confirmation"
        component={Confirmation}
      />

      <stackRoutes.Screen

        name="PlantSelection"
        component={PlantSelection}
      />
    </stackRoutes.Navigator>
  )
}

export default AppRoutes