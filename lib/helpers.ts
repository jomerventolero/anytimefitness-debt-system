

function isLocalStorageAvailable() {
  try {
      const testKey = 'test';
      localStorage.setItem(testKey, 'testValue');
      localStorage.removeItem(testKey);
      return true;
  } catch (error) {
      return false;
  }
}

export default isLocalStorageAvailable