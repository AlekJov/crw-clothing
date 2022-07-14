import {initializeApp} from 'firebase/app';
import {getAuth,signInWithRedirect,signInWithEmailAndPassword,
  signInWithPopup,GoogleAuthProvider,createUserWithEmailAndPassword,signOut,onAuthStateChanged} from 'firebase/auth';
import{ getFirestore,doc,getDoc,setDoc,collection, writeBatch,query,getDocs} from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {

    apiKey: "AIzaSyBmYGzJfho3SYUoaC4k9ahcdxLLEvXRJ9Y",
    authDomain: "crwn-cothing-db-7064f.firebaseapp.com",
    projectId: "crwn-cothing-db-7064f",
    storageBucket: "crwn-cothing-db-7064f.appspot.com",
    messagingSenderId: "472333465797",
    appId: "1:472333465797:web:e6adff237a051ef73758ac"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    promt:"select_account"
  });

  export const auth = getAuth();
  export const signInWtihGooglePopup = () => signInWithPopup(auth,googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider);


  export const db = getFirestore();

  export const addCollectionAndDocuments = async (collectionKey,objectsToAdd) =>{
      const collectionRef = collection(db,collectionKey);
      const batch = writeBatch(db);

      objectsToAdd.forEach((object)=>{
        const docRef = doc(collectionRef,object.title.toLowerCase());
        batch.set(docRef,object);
      });
      await batch.commit()
      console.log('done');
  }

 

  export const getCategoriesAndDocuments = async ()=>{
      const collectionRef = collection(db,'categories');
      const q = query(collectionRef);
      const querySnapshot = await getDocs(q);
      const categoryMap = querySnapshot.docs.reduce((acc,docSnapshot)=>{
        const {title,items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
      },{});
      return categoryMap;
  
  }

  export const createUserDocumentFromAuth = async(userAuth) => {

    if(!userAuth) return;
    
     const userDocRef = doc(db, 'users', userAuth.uid);
     

     console.log(userDocRef);

     const userSnapshot = await getDoc(userDocRef);
     console.log(userSnapshot)

     if(!userSnapshot.exists()){
      const {displayName,email} = userAuth;  
      const createdAt = new Date();

     try{

      await setDoc(userDocRef,{
        displayName,email,createdAt
      });

     } catch(error){
        console.log('error creating the user',error.message);
     }
    }

    return userDocRef;
  }

export const createAuthUserWithEmailAndPassword = async (email,password) =>{
    if(!email || !password) return;
    return await
    createUserWithEmailAndPassword(auth,email,password)
}
export const signinAuthUserWithEmailAndPassword = async (email,password) =>{
  if(!email || !password) return;
  return await
  signInWithEmailAndPassword(auth,email,password)
}

export const signOutUser = async () => await signOut(auth)


export const onAuthStateChangedListener = (callback) =>{
  onAuthStateChanged(auth,callback)
}