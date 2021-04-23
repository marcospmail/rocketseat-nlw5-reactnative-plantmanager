import React from 'react';
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost'
import AppLoading from 'expo-app-loading';

import Routes from './src/routes';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  })

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
