import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  limit,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { auth, db } from "./firebase";

const authorize = () => {
  //function to check if user is logged in or not
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

// export async function getEvents(db) {
//   const eventsof = collection(db, "Events");
//   const EventSnapshot = await getDocs(eventsof);
//   const eventList = EventSnapshot.docs.map((doc) => doc.data());

//   return eventList;
// }

// export async function getdetails(values) {
//   const eventsof = collection(db, "Events");
//   const q = query(
//     eventsof,
//     where("Event_Category", "==", `${values.select_category}`)
//   );
//   const querySnapshot = await getDocs(q);
//   const userlist = querySnapshot.docs.map((doc) => doc.data());
//   return userlist;
// }

export const listEvents = async (values = {}, nextToken = false) => {
  let eventsof = collection(db, "Events");
  let EventSnapshot;
  let quer;

  let queries = [];

  if (values.select_category) {
    queries.push(where("Event_Category", "==", `${values.select_category}`));
  }
  if (values.keyword) {
    queries.push(where("Event_search", "array-contains", `${values.keyword}`));
  }
  if (nextToken) {
    queries.push(startAfter(nextToken));
  }
  queries.push(limit(2));
  quer = query(eventsof, ...queries);
  EventSnapshot = await getDocs(quer);
  let lastkey = null;

  const userlist = EventSnapshot.docs.map((doc) => {
    lastkey = doc;
    return doc.data();
  });

  return { list: userlist, filters: values, lastkey };
};

export { authorize };
