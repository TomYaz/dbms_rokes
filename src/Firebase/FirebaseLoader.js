import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc, getDocs, setDoc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, uploadString } from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

export async function pullData() {
    let data = [];
    const collRef = collection(firestore, 'rokes');
    const snap = await getDocs(collRef);
    snap.forEach((doc) => {
        data.push(doc.data());
    });
    return data;
}

export async function saveNewItem(data) { // data => object

    const storageRef = ref(storage, 'rokes');

    await setDoc(doc(firestore, "rokes", data.object_number.toString()), data).then(docRef => {
        return true;
    })
        .catch(error => {
            alert('Something went wrong.')
            console.log(error);
        })

}

export async function deleteItem(ref) {
    await deleteDoc(doc(firestore, "rokes", ref)).then(docRef => {
        return true;
    })
        .catch(error => {
            alert('Connection to database failed.')
            console.log(error);
        });
}
