import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native.js';

// Configurar Parse
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('d53qx1JbNnpjK1AgaXfFbKwxuGZnCaSHyCiFhXkG', 'tmiaL7H7o3N0wOKEnKrOhVYdA5FByFfn9YdQhhBF'); 
Parse.serverURL = 'https://parseapi.back4app.com/';

export default Parse;
