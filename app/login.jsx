import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import {theme} from '../constants/theme'
import { hp, wp } from '../helpers/common';
import BackButton from '../components/BackButton';
import Input from '../components/Input';
import Icon from '../assets/icons';
import Button from '../components/Button';
import { router } from 'expo-router';
import { signIn } from '../lib/appwrite';
const Login = () => {
  const emailRef = useRef('')
  const passwordRef = useRef('')
  const [Loading, setLoading] = useState(false)
  const onsubmit = async  () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Login', 'Please fill in all fields')
      return;
    }
    setLoading(true)
    const email = emailRef.current.toLowerCase()
    const password = passwordRef.current.trim()
    try {
      const session = await signIn(email, password)
      if(!session){
        Alert.alert('Login', 'could not sign in')
      }else {
        router.push('home')
      }
    } catch (error) {
      Alert.alert('Login', error.message)
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <ScreenWrapper bg={'white'}>
      <View style={styles.container}>
        <BackButton handlePress={()=> router.push('welcome')}/>
        <View>
          <Text style={styles.welcomeText}>Hey,</Text>
          <Text style={styles.welcomeText}>Welcome Back</Text>
        </View>
        <View style={styles.form}>
          <Text style={{fontSize: hp(1.5), color: theme.colors.text}}>Please login to continue</Text>
          <Input
            placeholder="Enter your email"
            keyboardType="email-address"
            icon ={<Icon name='mail' size={24} strokeWidth={1.5}/>}
            onChangeText={value=>{emailRef.current = value}} 
          />
          <Input
            placeholder="Enter your password"
            secureTextEntry={true}
            icon ={<Icon name='lock' size={24} strokeWidth={1.5}/>}
            onChangeText={value=>{passwordRef.current = value}} 
          />
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
          <Button title='Login' onPress={onsubmit} Loading={Loading}/>
          <View style={styles.footer}>
            <Text style={styles.loginText}>Don't have an account?</Text>
            <Pressable onPress={()=>{router.push('signUp')}}>
              <Text style={[styles.loginText, {color: theme.colors.primaryDark, fontWeight: theme.fonts.bold}]}>Sign Up</Text>
              </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
  },
  welcomeText: {
    fontSize: hp(4),
    color: theme.colors.text,
    fontWeight: theme.fonts.bold,
  },
  form:{
    gap: 25
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 5
  },
  forgotPassword: {
    fontSize: hp(1.7),
    color: theme.colors.text,
    textAlign: 'right'
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