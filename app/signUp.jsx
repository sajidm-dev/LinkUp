import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import {theme} from '../constants/theme'
import { hp, wp } from '../helpers/common';
import BackButton from '../components/BackButton';
import Input from '../components/Input';
import Icon from '../assets/icons';
import Button from '../components/Button';
import { router } from 'expo-router';
import { createuser, getCurrentUser, logOut } from '../lib/appwrite';
const SignUp = () => {
  const emailRef = useRef('')
  const passwordRef = useRef('')
  const nameRef = useRef('')
  const [Loading, setLoading] = useState(false)
  const onsubmit = async () => {
    if (!emailRef.current || !passwordRef.current || !nameRef.current) {
      Alert.alert('Login', 'Please fill in all fields')
      return;
    }
    const name = nameRef.current.trim()
    const email = emailRef.current.toLowerCase()
    const password = passwordRef.current.trim()
    setLoading(true)
    try {
      // Create user and sign them in automatically
      const session  = await createuser(email, name, password);
      if (session){
        router.push('home')
      }
    } catch(error) {
      Alert.alert(error.message)
    } finally{
      setLoading(false)
    }
}
  return (
    <ScreenWrapper bg={'white'}>
      <View style={styles.container}>
        <BackButton handlePress={()=> router.push('welcome')}/>
        <View>
          <Text style={styles.welcomeText}>Let's,</Text>
          <Text style={styles.welcomeText}>Get Started</Text>
        </View>
        <View style={styles.form}>
          <Text style={{fontSize: hp(1.5), color: theme.colors.text}}>Create an account!</Text>
          <Input
            placeholder="Enter your name"
            icon ={<Icon name='user' size={24} strokeWidth={1.5}/>}
            onChangeText={value=>{nameRef.current = value}} 
          />
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
          <Button title='SignUp' onPress={onsubmit} Loading={Loading}/>
          <View style={styles.footer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <Pressable onPress={()=>{router.push('login')}}>
              <Text style={[styles.loginText, {color: theme.colors.primaryDark, fontWeight: theme.fonts.bold}]}>Login</Text>
              </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default SignUp

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