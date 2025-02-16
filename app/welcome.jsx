import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { StatusBar } from 'expo-status-bar'
import { hp, wp } from '../helpers/common'
import { theme } from '../constants/theme'
import Button from '../components/Button'
import { router } from 'expo-router'

const welcome =  () => {
  const [Loading, setLoading] = useState(false);
  const handleStart = () => {
    setLoading(true);
    setTimeout(() => {
      router.push('/signUp');
      setLoading(false);
    }, 300); // Short delay for better UI experience
  };
  return (
    <ScreenWrapper bg='white'>
      <StatusBar style="dark"/>
      <View style={styles.container}>
        <Image source={require('../assets/images/welcome.png')} style={styles.welcomeImage} resizeMode='contain'/>
        <View style={{gap:20}}>
          <Text style={styles.title}>LinkUp</Text>
          <Text style={styles.punchline}>where every thought finds a home and every image tells a story</Text>
        </View>
        <View style={styles.footer}>
          <Button buttonStyles={{marginHorizontal: wp(3)}} Loading={Loading} onPress={handleStart} title='Get Started'/>
            <View style={styles.bottomTextContainer}>
              <Text style={styles.loginText}>Already have an account?</Text>
              <Pressable onPress={()=>{router.push('/login')}}>
                <Text style={[styles.loginButton,{ color: theme.colors.primaryDark, fontWeight: theme.fonts.bold,}]}>Login</Text>
              </Pressable>
            </View>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default welcome

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: wp(5)
  },
  welcomeImage: {
    width: wp(100),
    alignSelf: 'center',
    height: hp(30)
  },
  title:{
    fontSize: hp(4),
    color: theme.colors.text,
    fontWeight: theme.fonts.extraBold,
    textAlign: 'center'
  },
  punchline: {
    fontSize: hp(1.7),
    color: theme.colors.text,
    paddingHorizontal: wp(10),
    textAlign: 'center'
  },
  footer: {
    width: '100%',
    gap: 20
  },
  bottomTextContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5
  },
  loginText: {
    color: theme.colors.text,
    fontSize: hp(1.7)
  },
})