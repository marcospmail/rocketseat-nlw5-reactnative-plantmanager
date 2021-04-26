import { useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { SafeAreaView, StyleSheet, View, Text } from 'react-native'

import Button from '../components/Button'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface Params {
  title: string
  subTitle: string
  buttonTitle: string
  icon: 'smile' | 'hug'
  nextScreen: string
}

const emojis = {
  hug: '🤗',
  smile: '😁'
}

function Confirmation() {
  const navigation = useNavigation()
  const routes = useRoute()

  const { title, subTitle, buttonTitle, icon, nextScreen } = routes.params as Params
  
  function navigateToPlantSelectionScreen() {
    navigation.navigate(nextScreen)
  }
  
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.content}>

        <Text style={styles.emoji}>
          {emojis[icon]}
        </Text>

        <Text style={styles.title}>
          {title}
        </Text> 

        <Text style={styles.subTitle}>
          {subTitle}
        </Text>

        <Button
          onPress={navigateToPlantSelectionScreen}
        title={buttonTitle} style={styles.button} />

      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 54
  },
  header: {
    alignItems: 'center'
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.heading,
    textAlign: 'center',
    color: colors.heading,
    lineHeight: 38,
    marginTop: 15
  },
  subTitle: {
    fontFamily: fonts.text,
    textAlign: 'center',
    fontSize: 17,
    paddingVertical: 20,
    color: colors.heading
  },
  button: {
    width: '100%',
    marginTop: 20
  },
  emoji: {
    fontSize: 78,
  },
})

export default Confirmation