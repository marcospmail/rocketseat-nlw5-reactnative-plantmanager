import React from 'react';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { StyleSheet, View, Text } from 'react-native';
import { SvgFromUri } from 'react-native-svg';
import { format } from 'date-fns';

import { PlantProps } from '../lib/storage';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantCardSecondaryProps extends RectButtonProps {
  plant: PlantProps
}

function PlantCardSecondary({ plant: { name, photo, dateTimeNotification }, ...rest }: PlantCardSecondaryProps) {
  return (
    <RectButton
      style={styles.container}
      {...rest}
    >

      <SvgFromUri uri={photo} width={50} height={50} />
      <Text style={styles.title} >
        {name}
      </Text>

      <View style={styles.details}>

        <Text style={styles.timeLabel} >
          Regar às 
        </Text>

        <Text style={styles.time} >
          { format(dateTimeNotification, 'HH:mm')}
        </Text>

      </View>

    </RectButton>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 25,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.shape,
    marginVertical: 5
  },
  title: {
    flex: 1,
    marginLeft: 10,
    fontFamily: fonts.heading,
    fontSize: 17,
  },
  details: {
    alignItems: 'flex-end'
  },
  timeLabel: {
    fontSize: 16,
    fontFamily: fonts.text,
    color: colors.body_light
  },
  time: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: fonts.heading,
    color: colors.body_dark
  }
})

export default PlantCardSecondary