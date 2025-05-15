import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { routes } from '../src/services/api';
import { Linking } from 'react-native';

const InfoScreen = () => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [routeHistory, setRouteHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleSubmit = async () => {
    if (!startLocation || !endLocation) {
      Alert.alert('Error', 'Please enter both start and end locations');
      return;
    }

    setLoading(true);
    try {
      const response = await routes.submitRoute(startLocation, endLocation);
      Alert.alert('Success', 'Route submitted successfully!');
      setStartLocation('');
      setEndLocation('');
      // Refresh route history
      fetchRouteHistory();
    } catch (error) {
      Alert.alert('Error', error.response?.data?.detail || 'Failed to submit route');
    } finally {
      setLoading(false);
    }
  };

  const fetchRouteHistory = async () => {
    try {
      const history = await routes.getRouteHistory();
      setRouteHistory(history);
    } catch (error) {
      console.error('Failed to fetch route history:', error);
    }
  };

  const openMap = async (routeId) => {
    try {
      const { map_url } = await routes.getMapUrl(routeId);
      await Linking.openURL(map_url);
    } catch (error) {
      Alert.alert('Error', 'Failed to open map');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>SafePath AI</Text>
      
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Start Location"
          value={startLocation}
          onChangeText={setStartLocation}
          placeholderTextColor="#7D7D7D"
        />

        <TextInput
          style={styles.input}
          placeholder="Enter End Location"
          value={endLocation}
          onChangeText={setEndLocation}
          placeholderTextColor="#7D7D7D"
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Submit Route</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.historyButton} 
          onPress={() => {
            setShowHistory(!showHistory);
            if (!showHistory) {
              fetchRouteHistory();
            }
          }}
        >
          <Text style={styles.historyButtonText}>
            {showHistory ? 'Hide History' : 'Show History'}
          </Text>
        </TouchableOpacity>

        {showHistory && (
          <View style={styles.historyContainer}>
            {routeHistory.map((route) => (
              <TouchableOpacity
                key={route.id}
                style={styles.historyItem}
                onPress={() => openMap(route.id)}
              >
                <Text style={styles.historyItemText}>
                  From: {route.start_location}
                </Text>
                <Text style={styles.historyItemText}>
                  To: {route.end_location}
                </Text>
                <Text style={styles.historyItemDate}>
                  {new Date(route.created_at).toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FBEF',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  formContainer: {
    padding: 20,
  },
  input: {
    width: '100%',
    padding: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderColor: 'rgba(52, 152, 219, 0.2)',
    borderWidth: 1,
    marginBottom: 15,
    color: '#2C3E50',
  },
  button: {
    width: '100%',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  historyButton: {
    width: '100%',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#3498DB',
    alignItems: 'center',
    marginBottom: 10,
  },
  historyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  historyContainer: {
    marginTop: 20,
  },
  historyItem: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(52, 152, 219, 0.2)',
  },
  historyItemText: {
    color: '#2C3E50',
    fontSize: 14,
    marginBottom: 5,
  },
  historyItemDate: {
    color: '#7D7D7D',
    fontSize: 12,
    marginTop: 5,
  },
});

export default InfoScreen;
