// export { basicHTTP, api } from './http';
// export { createUserRecord } from './auth';

// export { gameCount, userTrend } from './firestore';
// export { resizeAvatar } from './storage';
import * as admin from "firebase-admin";

// tslint:disable-next-line:no-implicit-dependencies
var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://quotes-1604023917950.firebaseio.com"
});


export { createUserRecord } from './auth';
export { basicHTTP, api } from './http';
export { gameCount, userTrend } from './firestore';
export { resizeAvatar } from './storage';
export { sendText } from './callable';
export { indexFakeUserCreate, unIndexFakeUserCreate } from './fulltext-search-firestore';