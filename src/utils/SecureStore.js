import * as SecureStore from 'expo-secure-store';

async function setStorage(key, value) {
  await SecureStore.setItemAsync(key, value && JSON.stringify(value));
}

function getStorage(key) {
  const value = new Promise((resolve, reject) => {
    SecureStore.getItemAsync(key).then(value => {
      resolve(value && JSON.parse(value));
    }).catch(error => {
      reject(error);
    });
  })
  return value;
}

async function removeStorage(key) {
  await SecureStore.deleteItemAsync(key);
}

export default {
  setStorage,
  getStorage,
  removeStorage
}