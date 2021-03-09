import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";
import algoliasearch from "algoliasearch";

// [START init_algolia]
// Initialize Algolia, requires installing Algolia dependencies:
// https://www.algolia.com/doc/api-client/javascript/getting-started/#install
//
// App ID and API Key are stored in functions config variables
const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
// const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key;

const ALGOLIA_INDEX_NAME = "firestore_try";
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
// [END init_algolia]

// [START update_index_function]
// Update the search index every time a blog post is written.
export const indexFakeUserCreate = functions.firestore
  .document("fakeUsers/{userId}")
  .onCreate((snap, context) => {
    // Get the note document
    const fakeUser = snap.data();
    // Add an 'objectID' field which Algolia requires
    fakeUser.objectID = context.params.userId; // same as snap.id

    // Write to the algolia index
    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.saveObject(fakeUser);
  });
// [END update_index_function]

export const unIndexFakeUserCreate = functions.firestore
  .document("fakeUsers/{userId}")
  .onDelete((snap, context) => {
    const objectID = context.params.userId;

    const index = client.initIndex(ALGOLIA_INDEX_NAME);

    return index.deleteObject(objectID);
  });

  
