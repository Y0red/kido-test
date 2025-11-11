import React, {Platform, useEffect} from "react";
import {StatusBar,  View, ActivityIndicator, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import * as ScreenOrientation from 'expo-screen-orientation';

function screenOrientationController(orientation = 'portrait')
{
    if(orientation === 'landscape')
    {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
    else
    {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
}

export default function GameScreen() {
  const { url, orientation } = useLocalSearchParams();
  const router = useRouter();


  useEffect(() => {
    StatusBar.setHidden(true, "fade");
    screenOrientationController(orientation);

    return () => {
        StatusBar.setHidden(false, "fade");
        StatusBar.setBackgroundColor('#ffffffff');
        ScreenOrientation.unlockAsync();
    }

}, []);

  return (
    <View style={styles.container}>
        <WebView
        source={{ uri: url,  }}
        startInLoadingState
        renderLoading={() => (
          <ActivityIndicator style={styles.loader} size="large" color="#00ff00">
            
          </ActivityIndicator>
        )}
         onMessage={(event) => 
          {
              console.log("Message from WebGL:", event.nativeEvent.data);
              const data = JSON.parse(event.nativeEvent.data);
              alert("from"+data.Game + "\n" + "Score:"+ data.Score);
          }}
      /> 
      
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => router.back()}
        activeOpacity={0.8}
      >
        <Ionicons name="close" size={26} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    size: "large",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 10,
    borderRadius: 50,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});
