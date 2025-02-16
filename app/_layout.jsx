import { router, Stack } from "expo-router";
import GlobalProvider, { useGlobalContext } from "../globals/GlobalProvider";
import { useEffect } from "react";

export default function RootLayout() {
  return (
  <GlobalProvider>
    <AuthRedirect />
    <Stack screenOptions={{ headerShown: false }} />
  </GlobalProvider>
);
}
function AuthRedirect() {
  const { isLoggedIn, isLoading } = useGlobalContext();

  useEffect(() => {
    if (!isLoading) {
      if (!isLoggedIn) {
        router.push("welcome");
      } else {
        router.push("home");
      }
    }
  }, [isLoggedIn, isLoading]);

  return null;
}
