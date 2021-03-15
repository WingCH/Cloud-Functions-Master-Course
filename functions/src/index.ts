// export { basicHTTP, api } from './http';
// export { createUserRecord } from './auth';

// export { gameCount, userTrend } from './firestore';
// export { resizeAvatar } from './storage';
import * as admin from "firebase-admin";

admin.initializeApp();


export { createUserRecord } from './auth';
export { basicHTTP, api } from './http';
export { gameCount, userTrend } from './firestore';
export { resizeAvatar } from './storage';
export { sendText } from './callable';
export { indexFakeUserCreate, unIndexFakeUserCreate } from './fulltext-search-firestore';