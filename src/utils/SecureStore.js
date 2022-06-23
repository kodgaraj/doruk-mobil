import * as SecureStore from 'expo-secure-store';

async function setStorage(key, value) {
  await SecureStore.setItemAsync(key, value && JSON.stringify(value));
}

async function getStorage(key) {
  return await SecureStore.getItemAsync(key);

  // if (result) {
  //   alert("🔐 Here's your value 🔐 \n" + result);
  // } else {
  //   alert('No values stored under that key.');
  // }
}

async function removeStorage(key) {
  await SecureStore.deleteItemAsync(key);
}

export default {
  setStorage,
  getStorage,
  removeStorage
}