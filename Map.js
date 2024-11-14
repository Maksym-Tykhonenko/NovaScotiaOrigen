import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ImageBackground , SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const MapScreen = ({ navigation }) => {
  const [region, setRegion] = useState({
    latitude: 44.682,
    longitude: -63.744,
    latitudeDelta: 3.5,
    longitudeDelta: 3.5,
  });

  const zoomIn = () => {
    setRegion(prevRegion => ({
      ...prevRegion,
      latitudeDelta: prevRegion.latitudeDelta / 2,
      longitudeDelta: prevRegion.longitudeDelta / 2,
    }));
  };

  const zoomOut = () => {
    setRegion(prevRegion => ({
      ...prevRegion,
      latitudeDelta: prevRegion.latitudeDelta * 2,
      longitudeDelta: prevRegion.longitudeDelta * 2,
    }));
  };

  return (
    <ImageBackground
      source={require('./back.png')} 
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.exitButton} onPress={navigation.goBack}>
          <Text style={styles.exitButtonText}>✖️</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Map</Text>
        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={setRegion}
          showsUserLocation={true}
        >
          <Marker
            coordinate={{ latitude: 44.6488, longitude: -63.5752 }}
            title="Halifax"
            description="Capital city of Nova Scotia"
          />
          <Marker
            coordinate={{ latitude: 45.9636, longitude: -62.7115 }}
            title="Antigonish"
            description="A beautiful small town"
          />
          <Marker
            coordinate={{ latitude: 45.2594, longitude: -63.5873 }}
            title="Truro"
            description="Known for its natural beauty"
          />
        </MapView>
        
        <View style={styles.zoomContainer}>
          <TouchableOpacity style={styles.zoomButton} onPress={zoomIn}>
            <Text style={styles.zoomButtonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.zoomButton} onPress={zoomOut}>
            <Text style={styles.zoomButtonText}>-</Text>
          </TouchableOpacity>
        </View>
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
  exitButton: {
    position: 'absolute',
    top: height * 0.02, 
    right: width * 0.05, 
    backgroundColor: '#FFAA00',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  exitButtonText: {
    fontSize: 24,
    color: '#FFAA00',
    fontWeight: '600',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: width * 0.05,
    alignItems: 'center', 
  },
  headerText: {
    marginTop: height * 0.03,
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#FFAA00',
    textAlign: 'center',
    marginBottom: height * 0.02,
  },
  map: {
    width: width * 0.9,
    height: height * 0.65, 
    alignSelf: 'center',
    borderRadius: 15,
  },
  zoomContainer: {
    position: 'absolute',
    bottom: height * 0.02, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.6,
    alignSelf: 'center', 
  },
  zoomButton: {
    width: width * 0.18,
    height: width * 0.18, 
    backgroundColor: '#FFAA00',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomButtonText: {
    fontSize: 32,
    color: '#1a1a1a',
    fontWeight: 'bold',
  },
});

export default MapScreen;
