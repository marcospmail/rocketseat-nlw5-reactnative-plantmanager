import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'

import colors from '../styles/colors'

interface ButtonProps {
  title: string
}

function Button({ title }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button}
      activeOpacity={0.9}>
      <Text style={styles.buttonText}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56
  },
  buttonText: {
    color: colors.white,
    fontSize: 24
  }
})

export default Button