import { db } from '../firebase/config';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';

const COLLECTION_NAME = 'daily_pulse_profiles';

/**
 * Subscribe to real-time updates for a specific profile (e.g., 'jojo' or 'chocks').
 * Whenever the Admin adds, deletes, or checks off a task, this callback fires instantly on all connected devices.
 */
export const subscribeProfileTasks = (profileId, onTasksUpdate, onError) => {
  if (!profileId || !db) return () => {};

  try {
    const docRef = doc(db, COLLECTION_NAME, profileId);
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data && data.tasks) {
            onTasksUpdate(data.tasks);
          }
        }
      },
      (error) => {
        console.warn(`Firestore listener warning for profile [${profileId}]:`, error.message);
        if (onError) onError(error);
      }
    );
    return unsubscribe;
  } catch (err) {
    console.error(`Failed to subscribe to profile [${profileId}]:`, err);
    if (onError) onError(err);
    return () => {};
  }
};

/**
 * Persist tasks for a profile to Firestore in real-time.
 */
export const syncProfileTasksToCloud = async (profileId, tasks) => {
  if (!profileId || !db) return false;

  try {
    const docRef = doc(db, COLLECTION_NAME, profileId);
    await setDoc(
      docRef,
      {
        tasks,
        updatedAt: new Date().toISOString()
      },
      { merge: true }
    );
    return true;
  } catch (error) {
    console.warn(`Firestore write warning for profile [${profileId}]:`, error.message);
    return false;
  }
};
