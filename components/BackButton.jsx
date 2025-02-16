import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from '../assets/icons'
import { theme } from '../constants/theme'
import { router } from 'expo-router'

const BackButton = ({size=24,handlePress}) => {
  return (
    <Pressable style={styles.button} onPress={handlePress}>
        <Icon name='arrowLeft' strokeWidth={2.5} color={theme.colors.text} size={size}/>
    </Pressable>
  )
}

export default BackButton

const styles = StyleSheet.create({
    button: {
        alignSelf: 'flex-start',
        padding: 5,
        borderRadius: theme.radius.sm,
        backgroundColor: 'rgba(0,0,0,0.07)',
    }
})