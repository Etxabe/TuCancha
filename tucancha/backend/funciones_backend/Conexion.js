import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native.js';

// Configurar Parse
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('d53qx1JbNnpjK1AgaXfFbKwxuGZnCaSHyCiFhXkG', 'eRi6kPqPcJPWmYKOPiCX96ce4YxkrousDYMId6ZD'); 
Parse.serverURL = 'https://parseapi.back4app.com/';

export default Parse;
