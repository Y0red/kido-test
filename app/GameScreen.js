import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  StatusBar,
  Platform,requireNativeComponent
} from "react-native";
import { useRouter } from "expo-router";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
//import * as NavigationBar from "expo-navigation-bar";
import {loc} from '../assets/www/online-checkers/index.html';
const SecureWebViewNative = requireNativeComponent('SecureWebView');

export default function GameScreen() {
  const router = useRouter();
  const [localUri, setLocalUri] = useState(null);
  const [visible, setVisible] = useState(true);
  const fadeAnim = new Animated.Value(1);
  let hideTimeout;

  // Fade animation
  const toggleButton = (show) => {
    Animated.timing(fadeAnim, {
      toValue: show ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setVisible(show);
  };

  const startHideTimer = () => {
    if (hideTimeout) clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => toggleButton(false), 3000);
  };

  const handleScreenTap = () => {
    if (!visible) toggleButton(true);
    startHideTimer();
  };

  // Load local HTML file
  useEffect(() => {
    const loadLocalHtml = async () => {
      try {
        const asset = Asset.fromModule(require("../assets/www/online-checkers/index.html"));
        await asset.downloadAsync();

        // Convert to file URL that WebView can load
        setLocalUri(asset.localUri || asset.uri);
      } catch (e) {
        console.error("Error loading local HTML:", e);
      }
    };

    loadLocalHtml();

    // Immersive full screen
    StatusBar.setHidden(true, "fade");
  //  if (Platform.OS === "android") {
   //   NavigationBar.setVisibilityAsync("hidden");
   //   NavigationBar.setBehaviorAsync("overlay-swipe");
   // }

    startHideTimer();

    return () => {
      StatusBar.setHidden(false, "fade");
    //  if (Platform.OS === "android") NavigationBar.setVisibilityAsync("visible");
      if (hideTimeout) clearTimeout(hideTimeout);
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={handleScreenTap}>
      <View style={styles.container}>
        {localUri ? (
                <SecureWebViewNative
        style={styles.webview}
        sourceUrl={`https://appassets.androidplatform.net/assets/www/online-checkers/index.html`}
      />
/*           <WebView
            useWebKit={true}
            javaScriptEnabled={true}
            originWhitelist={["*"]}
            source={{ uri: localUri }}
            allowFileAccess = {true}
            allowUniversalAccessFromFileURLs={true}
            allowFileAccessFromFileURLs
            domStorageEnabled={true}
            mixedContentMode="always"
            startInLoadingState={true}
            renderLoading={() => (
              <ActivityIndicator style={styles.loader} size="large" color="#007AFF" />
            )}
          /> */
        ) : (
          <ActivityIndicator style={styles.loader} size="large" color="#007AFF" />
        )}

       
        <Animated.View style={[styles.closeButton, { opacity: fadeAnim }]}>
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.8}
            style={styles.closeButtonInner}
          >
            <Ionicons name="close" size={26} color="#fff" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  closeButton: { position: "absolute", top: 40, left: 20 },
  closeButtonInner: {
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 10,
    borderRadius: 50,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});