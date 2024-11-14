import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, ImageBackground, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const ProgressBar = ({ route, navigation }) => {
  const { quizId, score } = route.params || {};
  const [quizProgress, setQuizProgress] = useState(Array(10).fill({ score: 0, progressPercentage: 0 }));

  
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const storedProgress = await AsyncStorage.getItem('quizProgress');
        if (storedProgress) {
          setQuizProgress(JSON.parse(storedProgress));
        }
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    };
    loadProgress();
  }, []);

 
  useEffect(() => {
    if (quizId !== undefined && score !== undefined) {
      setQuizProgress((prevProgress) => {
        const updatedProgress = [...prevProgress];

       
        if (score > updatedProgress[quizId - 1].score) {
          updatedProgress[quizId - 1] = {
            score,
            progressPercentage: (score / (10 * 10)) * 100, 
          };

        
          AsyncStorage.setItem('quizProgress', JSON.stringify(updatedProgress)).catch((error) => {
            console.error('Error saving progress:', error);
          });
        }

        return updatedProgress;
      });
    }
  }, [quizId, score]);

  return (
    <ImageBackground source={require('./back.png')} style={styles.backgroundImage}>
       <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <TouchableOpacity style={styles.exitButton} onPress={() => navigation.goBack()}>
        <Text style={styles.exitButtonText}>✖️</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Quiz Progress</Text>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {quizProgress.map((quiz, index) => (
          <View key={index} style={styles.progressContainer}>
            <Text style={styles.text}>
              Quiz {index + 1}: {quiz.progressPercentage.toFixed(0)}% | Score: {quiz.score}
            </Text>
            <View style={styles.progressBar}>
              <View style={[styles.progress, { width: `${quiz.progressPercentage}%` }]} />
            </View>
          </View>
        ))}
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
  contentContainer: {
    paddingBottom: 20,
  },
  header: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#FFAA00',
    textAlign: 'center',
    marginBottom: 20,
  },
  progressContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  text: {
    fontSize: width * 0.045,
    color: '#FFAA00',
    marginBottom: 5,
  },
  progressBar: {
    width: '100%',
    height: 12,
    backgroundColor: '#333',
    borderRadius: 6,
  },
  progress: {
    height: '100%',
    backgroundColor: '#FFAA00',
    borderRadius: 6,
  },
  exitButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#FFAA00',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  exitButtonText: {
    fontSize: 24,
    color: '#FFAA00',
    fontWeight: 'bold',
  },
});

export default ProgressBar;