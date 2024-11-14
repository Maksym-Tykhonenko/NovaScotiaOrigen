import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions, ImageBackground , SafeAreaView} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const defaultProfilePhoto = require('./user_1077114.png'); 
const background = require('./back.png'); 

const interestsList = [
  'Festivals', 'Cuisine', 'Climate', 'Outdoor', 'Cultures',
  'Infrastructure', 'Arts', 'Government', 'Fisheries', 'Music'
];

const ProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [yearOfBirth, setYearOfBirth] = useState('');
  const [timesVisited, setTimesVisited] = useState('Never');
  const [interests, setInterests] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState(null);
  useEffect(() => {
    const loadProfileData = async () => {
      const savedName = await AsyncStorage.getItem('userName');
      const savedPhoto = await AsyncStorage.getItem('profilePhoto');
      if (savedName) setName(savedName);
      if (savedPhoto) setProfilePhoto(savedPhoto);
    };

    loadProfileData();
  }, []);

  const handleInterestToggle = (interest) => {
    setInterests(prevInterests => {
      if (prevInterests.includes(interest)) {
        return prevInterests.filter(i => i !== interest);
      } else {
        return [...prevInterests, interest];
      }
    });
  };

  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300, 
      maxHeight: 300, 
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const { uri } = response.assets[0];
        setProfilePhoto(uri);
      }
    });
  };

  const handleSubmit = () => {
    navigation.navigate('MainMenu', { interests, profilePhoto, name });
    navigation.setParams({ name, profilePhoto });
  };
  
  return (
    <ImageBackground source={background} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer} 
    >
      
      <Text style={styles.label}>Name:</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
        style={styles.input}
      />

     

      <Text style={styles.label}>How many times have you been to Nova Scotia?</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={timesVisited}
          onValueChange={(itemValue) => setTimesVisited(itemValue)}
          style={styles.picker}
          dropdownIconColor="#007BFF"
        >
          <Picker.Item label="Never" value="Never" />
          <Picker.Item label="1-3 times" value="1-3 times" />
          <Picker.Item label="4+ times" value="4+ times" />
          <Picker.Item label="I live here" value="I live here" />
        </Picker>
      </View>

      {/* Interests Selection */}
      <Text style={styles.label}>Choose what you're interested in:</Text>
      <View style={styles.interestsContainer}>
        {interestsList.map(interest => (
          <TouchableOpacity
            key={interest}
            onPress={() => handleInterestToggle(interest)}
            style={{
              ...styles.interestButton,
              backgroundColor: interests.includes(interest) ? '#C5A354' : '#1a1a1a',
            }}
          >
            <Text style={styles.interestText}>{interest}</Text>
          </TouchableOpacity>
        ))}
      </View>

      
      <Text style={styles.label}>Customize your profile photo:</Text>
      <TouchableOpacity onPress={pickImage} style={styles.photoButton}>
        {profilePhoto ? (
          <Image source={{ uri: profilePhoto }} style={styles.photoImage} />
        ) : (
          <Image source={defaultProfilePhoto} style={styles.photoImage} />  
        )}
      </TouchableOpacity>

      
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
    <Text style={styles.submitButtonText}>{name ? 'Save Profile' : 'GO'}</Text>
</TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
   </ImageBackground>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
   
    padding: 20,
  },
  contentContainer: {
    paddingBottom: 20, 
  },
  label: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FFFFFF', 
  },
  input: {
    borderWidth: 1,
    padding: height * 0.015,
    marginBottom: height * 0.02,
    borderRadius: 10,
    backgroundColor: '#FFAA00',
    borderColor: '#2a2a2a',
  },
  pickerContainer: {
    height: 150,
    overflow: 'hidden',
  },
  picker: {
    height: 150,
    width: '100%',
    borderWidth: 1,
    borderColor: '#2a2a2a',
    borderRadius: 10,
    backgroundColor: '#FFAA00',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: height * 0.02,
  },
  interestButton: {
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.04, 
    margin: width * 0.015, 
    borderRadius: 10, 
    borderWidth: 1,
    borderColor: '#FFAA00',
    width: '45%', 
  },
  interestText: {
    fontSize: width * 0.04,
    color: 'white',
    textAlign: 'center', 
  },
  photoButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#808080',
    borderRadius: 10,
    width: width * 0.4, 
    height: width * 0.4, 
    alignSelf: 'center',
    marginBottom: height * 0.02,
  },
  photoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: '#FFAA00', 
    padding: height * 0.02,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: width * 0.045,
    color: '#1a1a1a', 
    fontWeight: 'bold',
  },
});


export default ProfileScreen;
