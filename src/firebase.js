import firebase from 'firebase';
import 'firebase/app';
import 'firebase/auth';
import { config } from './firebase.config';
firebase.initializeApp(config);
export { firebase };
