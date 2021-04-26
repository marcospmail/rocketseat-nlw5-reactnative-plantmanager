import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ViewProps } from 'react-native';

import userImg from '../assets/user.png'
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface HeaderProps extends ViewProps {

}

function Header(props: HeaderProps) {
  const [userName, setUserName] = useState('')


  useEffect(() => {
    async function fetchStorageUserName() {
      const userName = await AsyncStorage.getItem('@plantmanager:username')
      setUserName(userName || '')
    }

    fetchStorageUserName()
  }, [])
  

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá</Text>
        <Text style={styles.userName}>{ userName }</Text>
      </View>

      <Image source={userImg} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    width: '100%'
  },
  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text
  },
  userName: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40
  }
})

export default Header;