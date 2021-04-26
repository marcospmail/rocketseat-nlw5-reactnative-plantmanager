import React from 'react';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { StyleSheet, View, Text } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { SvgFromUri } from 'react-native-svg';

interface PlantCardPrimaryProps extends RectButtonProps {
  data: {
    name: string
    photo: string
  }
}

function PlantCardPrimary({ data: { name, photo }, ...rest }: PlantCardPrimaryProps) {
  return (
    <RectButton
      style={styles.container}
      {...rest}
    >

      <SvgFromUri uri={photo} width={70} height={70} />
      <Text style={styles.text} >
        {name}
      </Text>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '45%',
    backgroundColor: colors.shape,
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  text: {
    color: colors.green_dark,
    fontFamily: fonts.heading,
    marginVertical: 16,
    textAlign: 'center'
  }
})

export default PlantCardPrimary