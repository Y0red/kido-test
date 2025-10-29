import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
             headerShown: false,
    /*        title: "🔥Games",
          headerStyle: { backgroundColor: "#007AFF" },
          headerTintColor: "#fff",  */
        }}
      />
      <Stack.Screen
        name="games"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="GameScreen"
        options={{
          headerShown: false, 
        }}
      />
    </Stack>
  );
}
