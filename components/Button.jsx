import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme';
import { hp } from '../helpers/common';

const  Button= ({title, onPress=()=>{},buttonStyles, textStyles, hasShadown=true , Loading = false
}) => {
  if(Loading){
    return (
      <View style={[styles.button, buttonStyles]}>
        <ActivityIndicator size={'large'} color='white'/>
      </View>
    )
  }
  return (
    <Pressable onPress={onPress} style={[styles.button, buttonStyles , hasShadown && styles.shadow]}>
      <Text style={[styles.text, textStyles]}>{title}</Text>
    </Pressable>
  )
}

export default Button;

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.colors.primary,
        height: hp(6.6),
        borderRadius: theme.radius.xl,
        justifyContent: 'center',
        alignItems: 'center',
        borderCurve: 'continuous'
    },
    text: {
        color: 'white',
        fontSize: hp(2.5),
        fontWeight: theme.fonts.bold
    },
    shadow: {
        shadowColor: theme.colors.dark,
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5
    }
})