import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { SvgFromUri } from 'react-native-svg';
import { format } from 'date-fns';
import { Feather } from '@expo/vector-icons';


import { PlantProps } from '../lib/storage';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantCardSecondaryProps extends RectButtonProps {
  plant: PlantProps
  handleRemove: () => void
}

function PlantCardSecondary({ plant: { name, photo, dateTimeNotification }, handleRemove, ...rest }: PlantCardSecondaryProps) {

  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <View>
            <RectButton
              style={styles.buttonRemove}
              onPress={handleRemove}
            >
              <Feather name="trash" size={32} color={colors.white} />
            </RectButton>
          </View>
        </Animated.View>
      )}
    >

      <RectButton
        style={styles.container}
        {...rest}
      >
        <SvgFromUri uri={photo} width={50} height={50}  />
        <Text style={styles.title} >
          {name}
        </Text>
        <View style={styles.details}>
          <Text style={styles.timeLabel} >
            Regar às
          </Text>
          <Text style={styles.time} >
            {format(dateTimeNotification, 'HH:mm')}
          </Text>
        </View>
      </RectButton>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingLeft: 16,
    paddingRight: 22,
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
  },
  buttonRemove: {
    width: 100,
    height: 85,
    backgroundColor: colors.red,
    marginTop: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    right: 20,
    paddingLeft: 15
  }
})

export default PlantCardSecondary