import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router";

const numColumns = 2;
const { width } = Dimensions.get("window");
const CARD_WIDTH = width / numColumns - 24;

export default function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("https://fly-bird-build.vercel.app/Games/games.json")
      .then((res) => res.json())
      .then((data) => {
        setGames(localData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching games:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading games...</Text>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.cardHeader}>
      <Text style={{ fontSize: 44, fontWeight: "bold", color:"#126ba7ff" }}>
        Games
      </Text>
      </View>
      <FlatList style={{marginBottom: 100}}
      data={games.games}
      keyExtractor={(item, index) => index.toString()}
      numColumns={numColumns}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image
            source={{ uri: item.game_image_url }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.info}>
            <Text style={styles.title} numberOfLines={1}>{item.game_name}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                router.push({
                  pathname: "/games",
                  params: { url: item.game_link, name: item.game_name, orientation: item.orientation },
                })
              }
            >
              <Text style={styles.buttonText}>Play</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 8,
    justifyContent: "center",
  },
  cardHeader: {
    backgroundColor: "#fff",
    width: "80%",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    margin: 24,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 8,
    overflow: "hidden",
    width: CARD_WIDTH,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  image: {
    width: "100%",
    height: 140,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  info: {
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const localData = 
{
  "games": [
    {
      "game_id": 1,
      "game_description": "Dama Online",
      "game_image_url": "https://fly-bird-build.vercel.app/Games/online-checkers/logo.png",
      "game_name": "Dama King",
      "game_status": "PUBLISHED",
      "game_link": "https://fly-bird-build.vercel.app/Games/online-checkers/index.html",
      "orientation": "landscape",
    },
    {
      "game_id": 2,
      "game_description": "Flap Tap",
      "game_image_url": "https://fly-bird-build.vercel.app/Games/screenshot512x384.jpg",
      "game_name": "Flap Tap",
      "game_status": "PUBLISHED",
      "game_link": "https://fly-bird-build.vercel.app/Games/NewGame2/index.html",
      "orientation": "portrait",
    },
    {
      "game_id": 3,
      "game_description": "Guzo Geez",
      "game_image_url": "https://fly-bird-build.vercel.app/Games/guzogeezlogo.png",
      "game_name": "Guzo Geez",
      "game_status": "PUBLISHED",
      "game_link": "https://fly-bird-build.vercel.app/Games/NewGame1/index.html",
      "orientation": "portrait",
    },
    {
      "game_id": 4,
      "game_description": "Bingo",
      "game_image_url": "https://fly-bird-build.vercel.app/Games/bingo - Copy.jpeg",
      "game_name": "bingo",
      "game_status": "PUBLISHED",
      "game_link": "https://y0red-bingo.netlify.app/",
      "orientation": "portrait",
    } ,
    {
      "game_id": 5,
      "game_description": "Words",
      "game_image_url": "https://games.fun.et/icn/MergeShoot.png",
      "game_name": "Words",
      "game_status": "PUBLISHED",
      "game_link": "http://192.168.1.49:5500/index.html",
      "orientation" : "landscape"
    }
  ]
};