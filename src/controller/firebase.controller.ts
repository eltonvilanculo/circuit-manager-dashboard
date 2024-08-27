import { firebaseDataBase } from "@/lib/firebase";
import { getDatabase, ref, onValue, update } from "firebase/database";

export const firebaseRef = ref(firebaseDataBase, "/");
export const getFirebaseEquipmentStatus = (
  id: string
): Promise<{ Trigger: number; Value: number; id: string }> => {
  return new Promise((resolve, reject) => {
    onValue(
      firebaseRef,
      (snapshot) => {
        const data = snapshot.val();

        if (data) {
          resolve(data);
        } else {
          reject(null);
        }
      },
      (error) => {
        reject(error);
      }
    );
  });
};

export const updateTriggerValue = (value: number): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    const equipmentRef = ref(firebaseDataBase, `/`);

    try {
      await update(equipmentRef, { Trigger: value });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
