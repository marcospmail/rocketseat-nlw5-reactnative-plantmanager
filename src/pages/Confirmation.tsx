import React from 'react'
import { SafeAreaView, StyleSheet, View, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import Button from '../components/Button'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

function Confirmation() {
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.content}>

        <Text style={styles.emoji}>
          🤓
        </Text>

        <Text style={styles.title}>
          Prontinho
        </Text> 

        <Text style={styles.subTitle}>
          Agora vamos começar a cuidar das suas plantinhas com muito cuidado.
        </Text>

        <Button title="Confirmar" style={styles.button} />

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