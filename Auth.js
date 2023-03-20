import * as SecureStore from 'expo-secure-store';

// Save token to SecureStore
const storeToken = async (token) => {
  try {
    await SecureStore.setItemAsync('token', token);
    console.log('Token stored successfully.');
  } catch (error) {
    console.log('Error storing token: ', error);
  }
};

// Get token from SecureStore
const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync('token');
    if (token !== null) {
      console.log('Token retrieved successfully.');
      return token;
    } else {
      console.log('Token not found.');
    }
  } catch (error) {
    console.log('Error retrieving token: ', error);
  }
};

export { storeToken, getToken };