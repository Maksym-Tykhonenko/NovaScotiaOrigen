import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageBackground,
  SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainMenuScreen = ({ navigation, route }) => {
  const { name = 'Guest', profilePhoto, interests = [] } = route.params || {};
  const [showQuizzes, setShowQuizzes] = useState(false);

 
  const quizzes = [
    { id: 1, name: 'Quiz 1', topic: "Nova Scotia’s Festivals and Events" },
    { id: 2, name: 'Quiz 2', topic: "Nova Scotia's Cuisine and Culinary Traditions" },
    { id: 3, name: 'Quiz 3', topic: "Nova Scotia’s Climate and Weather Patterns" },
    { id: 4, name: 'Quiz 4', topic: "Nova Scotia’s Provincial Parks and Outdoor Activities" },
    { id: 5, name: 'Quiz 5', topic: "Nova Scotia’s Indigenous Peoples and Cultures" },
    { id: 6, name: 'Quiz 6', topic: "Nova Scotia’s Transportation and Infrastructure" },
    { id: 7, name: 'Quiz 7', topic: "Nova Scotia’s Arts and Literature" },
    { id: 8, name: 'Quiz 8', topic: "Nova Scotia’s Political Landscape and Government" },
    { id: 9, name: 'Quiz 9', topic: "Nova Scotia's Marine Life and Fisheries" },
    { id: 10, name: 'Quiz 10', topic: "Nova Scotia’s Music and Performing Arts" },
  ];

  
  const orderedQuizzes = [
    ...quizzes.filter((quiz) =>
      interests.some((interest) => quiz.topic.includes(interest))
    ),
    ...quizzes.filter(
      (quiz) => !interests.some((interest) => quiz.topic.includes(interest))
    ),
  ];

  const loadUserData = async () => {
    try {
      const storedName = await AsyncStorage.getItem('userName');
      const storedPhoto = await AsyncStorage.getItem('profilePhoto');
      const storedInterests = await AsyncStorage.getItem('userInterests');
      if (storedName) setName(storedName);
      if (storedPhoto) profilePhoto(storedPhoto);
      if (storedInterests) setInterests(JSON.parse(storedInterests));
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadUserData();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <ImageBackground source={require('./back.png')} style={styles.backgroundImage}>
      <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {!showQuizzes && (
          <TouchableOpacity
            style={styles.profileIcon}
            onPress={() => navigation.navigate('Profile')}
          >
            {profilePhoto ? (
              <Image source={{ uri: profilePhoto }} style={styles.profileImage} />
            ) : (
              <Image source={require('./user_1077114.png')} style={styles.profileImage} />
            )}
          </TouchableOpacity>
        )}
        {!showQuizzes ? (
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => setShowQuizzes(true)}
            >
              <Text style={styles.quizzesButtonText}>Quizzes</Text>
            </TouchableOpacity>
            {['Folder', 'Map', 'Progress', 'Store', 'Settings'].map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.menuButton}
                onPress={() => navigation.navigate(item)}
              >
                <Text style={styles.menuText}>{item}</Text>
              </TouchableOpacity>
            ))}
            
            
          </View>
        ) : (
          
          <View style={styles.quizContainer}>
            <TouchableOpacity
              style={styles.exitButton}
              onPress={() => setShowQuizzes(false)}
            >
              <Text style={styles.exitButtonText}>✖️</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.megaQuizButton}
              onPress={() => navigation.navigate('MegaQuiz')}
            >
              <Text style={styles.megaQuizButtonText}>Mega Quiz</Text>
            </TouchableOpacity>
            <ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  style={styles.quizScroll}
  snapToAlignment="start"
  snapToInterval={360} 
  decelerationRate="fast"
  contentContainerStyle={{ paddingHorizontal: 15 }} 
>
  {orderedQuizzes.map((quiz) => (
    <TouchableOpacity
      key={quiz.id}
      style={styles.quizCard}
      onPress={() =>
        navigation.navigate('Quiz', { quizId: quiz.id, topic: quiz.topic })
      }
    >
      <Text style={styles.quizText}>{quiz.name}</Text>
      <Text style={styles.quizTopic}>{quiz.topic}</Text>
    </TouchableOpacity>
  ))}
</ScrollView>
          </View>
        )}
      </View>
      </SafeAreaView>
    </ImageBackground>
  );
};const styles = StyleSheet.create({
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
    justifyContent: 'center',
    padding: 20,
  },
  profileIcon: {
    
    marginTop:10,
    position: 'absolute',
    top: 20,
    right: 10,
    backgroundColor: '#FFAA00',
    padding: 5,
    borderRadius: 50,
  },
  profileImage: {
    
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  menuContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  menuButton: {
    backgroundColor: '#FFAA00',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  megaQuizButton: {
    backgroundColor: '#FFAA00',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
  },
  megaQuizButtonText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
 
  quizzesButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  quizContainer: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
  },
  exitButton: {
    marginTop: -30,
    alignSelf: 'flex-end',
    backgroundColor: '#FFAA00',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 70,
    elevation: 3,
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
  quizScroll: {
    marginTop: 30,
    
  },
  quizCard: {
  
    width: 310,
    height: 310,
    backgroundColor: '#FFAA00',
    marginHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 200,
  },
  quizText: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  quizTopic: {
    fontWeight: 'bold',
    fontSize: 19,
    textAlign: 'center',
    marginTop: 5,
  },
});

export default MainMenuScreen;