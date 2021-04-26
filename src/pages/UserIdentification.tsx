import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

import Button from '../components/Button'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

function UserIdentification() {
  const navigation = useNavigation()

  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  const [userName, setUserName] = useState('')

  function handleInputBlur() {
    setIsFocused(false)
  }

  function handleInputFocus() {
    setIsFocused(true)
  }

  function handleInputChange(value: string) {
    setIsFilled(!!value)
    setUserName(value)
  }

  const navigateToConfirmationScreen = () => {
    if (!userName) {
      Alert.alert('Preencha seu nome')
      return
    } 

    AsyncStorage.setItem('@plantmanager:username', userName)

    navigation.navigate('Confirmation', {
      title: 'Prontinho',
      subTitle: 'Agora vamos começar a cuidar das suas plantas',
      buttonTitle: 'Começar',
      icon: 'smile',
      nextScreen: 'PlantSelection'
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          <View style={styles.form}>
            <View style={styles.header}>
              <Text style={styles.emoji}>
                😉
              </Text>
              <Text style={styles.title}>
                Como podemos {'\n'}
                chamar você?
              </Text>
            </View>
            <TextInput
              style={[styles.input, (isFocused || isFilled) && { borderColor: colors.green }]} placeholder="Digite seu nome"
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
              onChangeText={handleInputChange}
            />
            <Button
              onPress={navigateToConfirmationScreen}
              title="Confirmar"
              style={styles.button} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  form: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 54,
  },
  header: {
    alignItems: 'center'
  },
  emoji: {
    fontSize: 44,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center'
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 20
  },
  button: {
    width: '100%',
    marginTop: 20
  }
})

export default UserIdentification