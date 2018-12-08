import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { config } from './firebase.config';
firebase.initializeApp(config);
export { firebase };
