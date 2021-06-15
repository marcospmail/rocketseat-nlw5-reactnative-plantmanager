import React, { useEffect } from 'react';
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost'
import AppLoading from 'expo-app-loading';
import * as Notifications from 'expo-notifications'

import Routes from './src/routes';
import { StatusBar } from 'expo-status-bar';

if (__DEV__) {
  import('./src/ReactotronConfig').then(() => console.log('Reactotron Configured'))
}


export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  })

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  }, [])

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <>
      <StatusBar style="dark" backgroundColor="white" translucent={false} />
      <Routes />
    </>
  )
}
