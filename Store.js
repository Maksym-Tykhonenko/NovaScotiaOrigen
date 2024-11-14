import React, { useState ,useEffect} from 'react';
import { View, Text,  Image, Alert, ScrollView, StyleSheet, TouchableOpacity, ImageBackground,SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const places = [
    { id: 1, name: "Cabot Trail", price: 20, location: "Cape Breton Island", description: "The Cabot Trail is a world-famous scenic highway that loops around the northern tip of Cape Breton Island. Stretching over 300 kilometers, it offers breathtaking views of the Atlantic Ocean, rugged cliffs, and lush forests. The trail passes through Cape Breton Highlands National Park, home to diverse wildlife such as moose and bald eagles. Travelers can enjoy hiking, whale watching, and exploring charming coastal villages like Baddeck and Cheticamp. The stunning vistas, especially during the fall when the foliage turns vibrant shades of red and orange, make the Cabot Trail a must-visit destination for nature lovers and photographers alike." },
    { id: 2, name: "Peggy’s Cove", price: 30, location: "Peggy's Cove", description: "Peggy’s Cove is a quintessential Nova Scotian fishing village located about 43 kilometers southwest of Halifax. Famous for its iconic lighthouse perched on granite boulders, Peggy’s Cove offers a picturesque and serene setting that attracts tourists year-round. The rocky coastline provides dramatic ocean views, and the village itself is charming with its colorful houses and quaint shops. Visitors can enjoy fresh seafood at local restaurants, explore the rocks around the lighthouse, and learn about the area's history at the Peggy’s Cove Preservation Area. The blend of natural beauty and maritime heritage makes Peggy’s Cove a highlight of any Nova Scotia itinerary." },
    { id: 3, name: "Halifax Waterfront", price: 45, location: "Halifax", description: "The Halifax Waterfront is one of the most vibrant and bustling areas in Nova Scotia's capital city. Stretching along the edge of Halifax Harbour, it offers a lively mix of restaurants, shops, museums, and historic sites. Visitors can enjoy a leisurely walk along the boardwalk, dine at waterfront restaurants serving fresh seafood, and visit attractions like the Maritime Museum of the Atlantic and the Canadian Museum of Immigration at Pier 21. The waterfront is also home to seasonal events and festivals, making it a dynamic spot for both locals and tourists. The combination of cultural experiences, scenic views, and entertainment options makes the Halifax Waterfront a top destination in Nova Scotia." },
    { id: 4, name: "Lunenburg", price: 45, location: "Lunenburg", description: "Lunenburg is a UNESCO World Heritage Site and one of the best-preserved colonial settlements in North America. Located on the South Shore, this picturesque town is renowned for its colorful waterfront, historic architecture, and rich maritime heritage. Visitors can explore the Fisheries Museum of the Atlantic, take a harbor tour on a traditional schooner, and enjoy fresh seafood at local restaurants. Lunenburg is also known for its vibrant arts scene, with numerous galleries and studios. The town's charming streets, filled with unique shops and heritage homes, provide a delightful experience for history buffs, art lovers, and anyone looking to soak in Nova Scotia's coastal charm." },
    { id: 5, name: "Annapolis Royal Historic Gardens", price: 50, location: "Annapolis Royal", description: "The Annapolis Royal Historic Gardens are a 17-acre oasis of horticultural beauty and historical significance. Located in the town of Annapolis Royal, these award-winning gardens feature a mix of formal and informal landscapes, including a Victorian garden, a rose garden, and a reconstructed Acadian house with a traditional herb garden. Visitors can stroll along winding paths, enjoy the frag." },
    { id: 6, name: "The Ovens Natural Park", price: 35, location: "Riverport", description: "The Ovens Natural Park, located on the South Shore of Nova Scotia, is famous for its impressive sea caves and rugged coastline. Visitors can hike along the park's trails, which offer stunning views of the Atlantic Ocean and lead to the mouth of several sea caves. The sound of the waves crashing into the caves creates a dramatic and awe-inspiring experience. The park also features a campground, gold-panning activities, and a museum showcasing the area's gold rush history. The unique geological formations and natural beauty of The Ovens make it a fascinating destination for outdoor enthusiasts and geology buffs." },
    { id: 7, name: "Hall's Harbour Lobster Pound", price: 15, location: "Hall's Harbour", description: "Hall's Harbour Lobster Pound is a renowned seafood restaurant and lobster pound located on the Bay of Fundy. This charming spot offers visitors a true taste of Nova Scotia's maritime culture. Guests can choose their own lobster from the pound and have it cooked to perfection while enjoying stunning views of the harbor. The restaurant's rustic setting, combined with the fresh, delicious seafood, creates an authentic and memorable dining experience. The tidal changes in the harbor, which can be observed from the deck, add to the unique charm of Hall's Harbour. This destination is perfect for seafood lovers and those looking to experience Nova Scotia's coastal traditions." },
    { id: 8, name: "Cape Split", price: 75, location: "Scots Bay", description: "Cape Split is a popular hiking destination located on the Bay of Fundy. The trail to Cape Split is about 13 kilometers round trip and offers stunning views of the rugged coastline and the powerful tides of the bay. The hike winds through forested areas and open meadows, leading to a dramatic cliff-top lookout that provides panoramic views of the ocean and surrounding landscape. The scenic beauty and the sense of achievement from reaching the lookout make Cape Split a favorite spot for hikers and nature enthusiasts. The area is also known for its diverse birdlife and unique coastal ecosystems." },
    { id: 9, name: "The Old Triangle Irish Alehouse", price: 90, location: "Halifax", description: "The Old Triangle Irish Alehouse is a beloved pub located in downtown Halifax. Known for its warm atmosphere, live music, and excellent food, this pub offers a taste of Ireland in the heart of Nova Scotia. The menu features a mix of traditional Irish dishes and local favorites, and the bar serves a wide selection of beers, including local craft brews and Irish imports. Live performances, often featuring local musicians, create a lively and inviting ambiance. The Old Triangle is a great place to experience Nova Scotia's vibrant pub culture and enjoy an evening of music, food, and camaraderie." },
    { id: 10, name: "Skyline Trail", price: 100, location: "Cape Breton Highlands National Park", description: "The Skyline Trail is one of the most famous hiking trails in Cape Breton Highlands National Park. This well-maintained trail offers a relatively easy hike with spectacular views of the Gulf of St. Lawrence and the surrounding highlands. The trail features boardwalks and viewing platforms, making it accessible to a wide range of visitors. Along the way, hikers may spot wildlife such as moose, bald eagles, and various bird species. The highlight of the trail is the cliff-top viewpoint, which provides breathtaking panoramic views, especially at sunset. The combination of stunning scenery, wildlife encounters, and accessible pathways makes the Skyline Trail a must-visit for nature lovers and outdoor adventurers." }
  ];
  
  const Store = ({ route, navigation }) => {
    const [coins, setCoins] = useState(0);
    const [purchasedPlaces, setPurchasedPlaces] = useState(new Set());
    const coinIcon = require('./coin.png');
    useEffect(() => {
      const loadStoreData = async () => {
          try {
              const savedCoins = await AsyncStorage.getItem('coins');
              setCoins(savedCoins ? parseInt(savedCoins, 10) : 0);
  
              const savedPurchasedPlaces = await AsyncStorage.getItem('purchasedPlaces');
              setPurchasedPlaces(savedPurchasedPlaces ? new Set(JSON.parse(savedPurchasedPlaces)) : new Set());
          } catch (error) {
              console.error('Error loading store data:', error);
          }
      };
      loadStoreData();
  }, []);
  

    
    useEffect(() => {
      const earnedCoins = route.params?.earnedCoins || 0;
      if (earnedCoins > 0) {
          const updatedCoins = coins + earnedCoins;
          setCoins(updatedCoins);
          AsyncStorage.setItem('coins', updatedCoins.toString());
          navigation.setParams({ earnedCoins: 0 });
      }
  }, [route.params?.earnedCoins]);

   
    const buyPlaceInfo = async (place) => {
      if (purchasedPlaces.has(place.id)) {
          Alert.alert("Already Purchased", "You have already bought this information.");
          return;
      }
  
      if (coins >= place.price) {
          const updatedPurchasedPlaces = new Set(purchasedPlaces);
          updatedPurchasedPlaces.add(place.id);
          setPurchasedPlaces(updatedPurchasedPlaces);
          setCoins(coins - place.price);
  
          try {
              await AsyncStorage.setItem('coins', (coins - place.price).toString());
              await AsyncStorage.setItem('purchasedPlaces', JSON.stringify(Array.from(updatedPurchasedPlaces)));
          } catch (error) {
              console.error("Error saving purchase:", error);
          }
      } else {
          Alert.alert("Insufficient Funds", "Not enough coins to purchase.");
      }
  };
    const exitStore = () => {
        navigation.goBack();
    };

    return (
      <ImageBackground source={require('./back.png')} style={styles.backgroundImage}>
        <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
            <TouchableOpacity style={styles.exitButton} onPress={exitStore}>
                <Text style={styles.exitButtonText}>✖️</Text>
            </TouchableOpacity>
            <View style={styles.coinContainer}>
      <Image source={coinIcon} style={styles.coinImage} />
      <Text style={styles.coinText}>{coins}</Text>
    </View>
            <Text style={styles.sectionTitle}>Available Places</Text>
            <ScrollView>
                {places.map((place) => {
                    const isPurchased = purchasedPlaces.has(place.id);
                    return (
                        <View key={place.id} style={isPurchased ? styles.purchasedCard : styles.placeCard}>
                            <Text style={styles.placeTitle}>{place.name} - {place.price} coins</Text>
                            <Text style={styles.placeLocation}>Location: {place.location}</Text>
                            {isPurchased ? (
                                <Text style={styles.placeDescription}>Description: {place.description}</Text>
                            ) : (
                                <>
                                    <Image source={{ uri: place.image }} style={styles.grayscaleImage} />
                                    <TouchableOpacity style={styles.buyButton} onPress={() => buyPlaceInfo(place)}>
                                        <Text style={styles.buyButtonText}>Buy Information</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>
                    );
                })}
            </ScrollView>
        </View>
        </SafeAreaView>
        </ImageBackground>
    );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
    container: {
      flex: 1,
     
      padding: 20,
    },
    exitButton: {
      
      alignSelf: 'flex-end',
      backgroundColor: '#FFAA00', 
      paddingHorizontal: 15,
      paddingVertical: 8,
      borderRadius: 10,
      marginBottom: 20,
      shadowColor: '#000', 
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
    },
    exitButtonText: {
      fontSize: 24,
      color: '#FFAA00',
    },
    coinText: {
      fontSize: 40,
      color: '#FFAA00', 
      marginBottom: 15,
    },
    addCoinsButton: {
      backgroundColor: '#FFAA00',
      padding: 10,
      borderRadius: 5,
      marginBottom: 20,
    },
    addCoinsButtonText: {
      color: '#1a1a1a',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    sectionTitle: {
      alignSelf:'center',
      fontSize: 20,
      color: '#FFAA00',
      fontWeight: 'bold',
      marginBottom: 10,
    },
    placeCard: {
      backgroundColor: '#2a2a2a',
      borderRadius: 10,
      padding: 15,
      marginBottom: 15,
      borderColor: '#FFAA00',
      borderWidth: 1,
    },
    purchasedCard: {
      backgroundColor: '#3a3a3a', 
      borderRadius: 10,
      padding: 15,
      marginBottom: 15,
      borderColor: '#C5A354', 
      borderWidth: 1,
    },
    placeTitle: {
      fontSize: 18,
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
    placeLocation: {
      fontSize: 16,
      color: '#CCCCCC',
    },
    placeDescription: {
      fontSize: 16,
      color: '#FFFFFF',
      marginTop: 5,
    },
    buyButton: {
      backgroundColor: '#FFAA00',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
    },
    buyButtonText: {
      color: '#1a1a1a',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    coinImage: {

      width: 45, 
      height: 45, 
      marginRight: 5, 
    },
    coinContainer: {
      flexDirection: 'row',  
     
    },
  });

export default Store;
