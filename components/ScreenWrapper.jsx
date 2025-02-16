import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ScreenWrapper = ({children , bg}) => {
    const top = useSafeAreaInsets();
    const topPadding = top>0 ? top+5 : 30;
  return (
    <View style={{flex:1, backgroundColor:bg, paddingTop:topPadding}}>
      {children}
    </View>
  )
}

export default ScreenWrapper;