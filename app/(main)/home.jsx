import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { logOut } from '../../lib/appwrite'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useGlobalContext } from '../../globals/GlobalProvider'

const home = () => {
    const logout =async ()=>{
    await logOut();
    router.push('login')
    }
    const {user} = useGlobalContext();
  return (
    <ScreenWrapper>
      <StatusBar style='dark'/>
        if(user){
          <Text>{user.name}</Text>
        }
        <Pressable onPress={logout}><Text>LogOut</Text></Pressable>
    </ScreenWrapper>
  )
}

export default home

const styles = StyleSheet.create({})