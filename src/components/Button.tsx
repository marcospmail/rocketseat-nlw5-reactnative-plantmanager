import { Feather } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, TouchableOpacity, Text, TouchableOpacityProps, TextStyle, StyleProp } from 'react-native'

import colors from '../styles/colors'

interface ButtonProps extends TouchableOpacityProps {
  title?: string
  icon?: JSX.Element
}

function Button({ title, icon, style, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, style]}
      activeOpacity={0.9}
      {...rest}
    >
      {icon}
      {title && (
        <Text style={[styles.buttonText]}>
          {title}
        </Text>
      )}
    </TouchableOpacity >
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
    padding: 20
  },
  buttonText: {
    color: colors.white,
    fontSize: 16
  }
})

export default Button