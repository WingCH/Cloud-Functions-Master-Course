import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import * as Twilio from "twilio";

const credentials = functions.config().twilio;

const client = Twilio(credentials.sid, credentials.token);

const db = admin.firestore();

export const sendText = functions.https.onCall(async (data, context) => {
  functions.logger.log("sendText", data);
  functions.logger.log("sendText", context);
//   const userId = context.auth.uid;

  const userRef = db.doc(`users/foo`);

  const userSnap = await userRef.get();

  const number = userSnap.data().phoneNumber;

  return client.messages.create({
    body: data.message,
    to: number, // User's number
    from: "+19288527875", // Your Twilio number
  });
});
