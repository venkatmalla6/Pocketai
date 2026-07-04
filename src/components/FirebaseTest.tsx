import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {FirebaseUtils} from '../utils/firebaseUtils';

interface FirebaseTestProps {
  onClose?: () => void;
}

export const FirebaseTest: React.FC<FirebaseTestProps> = ({onClose}) => {
  const [isReady, setIsReady] = useState(false);
  const [appInfo, setAppInfo] = useState<any>(null);
  const [testResult, setTestResult] = useState<string>('');

  useEffect(() => {
    checkFirebaseStatus();
  }, []);

  const checkFirebaseStatus = () => {
    const ready = FirebaseUtils.isReady();
    const info = FirebaseUtils.getAppInfo();
    
    setIsReady(ready);
    setAppInfo(info);
  };

  const runConnectionTest = async () => {
    setTestResult('Testing...');
    try {
      const result = await FirebaseUtils.testConnection();
      if (result) {
        setTestResult('✅ Firebase connection successful!');
        Alert.alert('Success', 'Firebase is properly initialized and connected!');
      } else {
        setTestResult('❌ Firebase connection failed');
        Alert.alert('Error', 'Firebase connection test failed');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setTestResult(`❌ Error: ${errorMessage}`);
      Alert.alert('Error', `Firebase test error: ${errorMessage}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Firebase Status</Text>
      
      <View style={styles.statusContainer}>
        <Text style={styles.label}>Initialization Status:</Text>
        <Text style={[styles.status, {color: isReady ? 'green' : 'red'}]}>
          {isReady ? '✅ Ready' : '❌ Not Ready'}
        </Text>
      </View>

      {appInfo && (
        <View style={styles.infoContainer}>
          <Text style={styles.label}>App Name:</Text>
          <Text style={styles.value}>{appInfo.name}</Text>
          
          <Text style={styles.label}>Project ID:</Text>
          <Text style={styles.value}>{appInfo.options?.projectId || 'Not available'}</Text>
          
          <Text style={styles.label}>App ID:</Text>
          <Text style={styles.value}>{appInfo.options?.appId || 'Not available'}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.testButton} onPress={runConnectionTest}>
        <Text style={styles.buttonText}>Test Connection</Text>
      </TouchableOpacity>

      {testResult ? (
        <Text style={styles.testResult}>{testResult}</Text>
      ) : null}

      <TouchableOpacity style={styles.refreshButton} onPress={checkFirebaseStatus}>
        <Text style={styles.buttonText}>Refresh Status</Text>
      </TouchableOpacity>

      {onClose && (
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    margin: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  infoContainer: {
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    marginTop: 5,
    color: '#666',
  },
  status: {
    fontWeight: 'bold',
  },
  testButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  refreshButton: {
    backgroundColor: '#34C759',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  testResult: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    textAlign: 'center',
  },
});

export default FirebaseTest;
