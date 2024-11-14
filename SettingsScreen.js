import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, Dimensions, ImageBackground , SafeAreaView} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { useAudio } from './AudioContext';
import { useVibration } from './VibrationContext';

const { width, height } = Dimensions.get('window');

const SettingsScreen = ({ navigation }) => {
  const { isMusicPlaying, setIsMusicPlaying, volume, setVolume } = useAudio();
  const { vibrationOn, setVibrationOn } = useVibration();


  const handleVolumeChange = (change) => {
    const newVolume = Math.max(0, Math.min(1, volume + change));
    setVolume(newVolume);
  };

  const handleAnswerFeedback = (isCorrect) => {
    if (vibrationOn) {
      ReactNativeHapticFeedback.trigger(isCorrect ? 'notificationSuccess' : 'notificationError');
    }
  };

  return (
    <ImageBackground source={require('./back.png')} style={styles.backgroundImage}>
       <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.setting}>
          <Text style={styles.settingText}>Vibration</Text>
          <Switch
                value={vibrationOn}
                onValueChange={setVibrationOn}
                trackColor={{ false: '#767577', true: '#FFAA00' }}
                thumbColor={vibrationOn ? '#1a1a1a' : '#f4f3f4'}
            />

        </View>

        <View style={styles.setting}>
          <Text style={styles.settingText}>Music Volume: {Math.round(volume * 100)}%</Text>
          <View style={styles.volumeControls}>
            <TouchableOpacity onPress={() => handleVolumeChange(-0.1)} style={styles.button}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleVolumeChange(0.1)} style={styles.button}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.setting}>
          <Text style={styles.settingText}>Turn Music On/Off</Text>
          <Switch
            value={isMusicPlaying}
            onValueChange={setIsMusicPlaying}
            trackColor={{ false: '#767577', true: '#FFAA00' }}
            thumbColor={isMusicPlaying ? '#1a1a1a' : '#f4f3f4'}
          />
        </View>

        <TouchableOpacity onPress={navigation.goBack} style={styles.exitButton}>
          <Text style={styles.exitButtonText}>Return to Main Menu</Text>
        </TouchableOpacity>
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
   
    padding: width * 0.05,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginBottom: height * 0.02,
    color: '#FFAA00',
    textAlign: 'center',
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: height * 0.01,
    padding: height * 0.02,
    borderRadius: 10,
    backgroundColor: '#2a2a2a',
    borderColor: '#FFAA00',
    borderWidth: 1,
  },
  settingText: {
    fontSize: width * 0.05,
    color: '#FFFFFF',
    flex: 1,
  },
  volumeControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: width * 0.1,
    height: height * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFAA00',
    borderRadius: 5,
    marginHorizontal: width * 0.02,
  },
  buttonText: {
    fontSize: width * 0.06,
    color: '#1a1a1a',
  },
  exitButton: {
    marginTop: height * 0.03,
    backgroundColor: '#FFAA00',
    borderRadius: 5,
    paddingVertical: height * 0.02,
    alignItems: 'center',
  },
  exitButtonText: {
    fontWeight: 'bold',
    fontSize: width * 0.05,
    color: '#1a1a1a',
  },
});

export default SettingsScreen;
