import React from 'react'
import { StyleSheet, SafeAreaView, Text, Image, Dimensions, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import Button from '../components/Button'

import wateringImg from '../assets/watering.png'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function Welcome() {
  const navigation = useNavigation()

  const navigateToUserIdentificationScreen = () => {
    navigation.navigate('UserIdentification')
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.wrapper}>

        <Text style={styles.title}>
          Gerencie {'\n'}
        suas plantas{'\n'}
        de forma fácil
      </Text>
        <Image source={wateringImg} style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.subTitle}>
          Não esqueça mais de regar suas plantas.
          Nós cuidamos de lembrar você sempre que precisar.
      </Text>
        <Button
          onPress={navigateToUserIdentificationScreen}
          icon={<Feather name="chevron-right" style={styles.buttonText} />}
        />

      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.heading,
    marginTop: 38,
    fontFamily: fonts.heading,
    lineHeight: 34
  },
  subTitle: {
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
    fontFamily: fonts.text
  },
  image: {
    width: Dimensions.get('window').width * 0.7
  },
  buttonText: {
    fontSize: 32,
    color: colors.white
  }
})

export default Welcome

