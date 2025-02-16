import { ActivityIndicator, Button, Text, View } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import { router, useRouter } from "expo-router";
import { theme } from "../constants/theme";
import { useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";

export default function Index() {
  return (
    <ScreenWrapper bg='white'>
      <StatusBar style="light" backgroundColor="white"/>
      <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size={"large"} color={theme.colors.primary}/>
      </View>
    </ScreenWrapper>
  );
}
