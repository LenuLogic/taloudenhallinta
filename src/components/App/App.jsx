import AppRouter from '../AppRouter';
import firebase from './firebase';
import { addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import useLocalStorage from '../../shared/uselocalstorage';
import { useState } from 'react';

function App() {
  // tallennetaan lisätyt merkinnät tilamuuttujaan
  const [data, setData] = useState([]);
  const [typelist, setTypelist] = useState([]);
  const firestore = getFirestore(firebase);

  useEffect( () => {
    const unsubscribe = onSnapshot(query(collection(firestore, 'item'),
                                         orderBy('paymentDate', 'desc')), 
                                  snapshot => {
      const newData = []
      snapshot.forEach( doc => {
        newData.push({ ...doc.data(), id: doc.id })
      })
      setData(newData)
    })
    return unsubscribe
  }, [])

  useEffect( () => {
    const unsubscribe = onSnapshot(query(collection(firestore, 'type'),
                                         orderBy('type')),
                                   snapshot => {
      const newTypelist = []
      snapshot.forEach( doc => {
        newTypelist.push(doc.data().type)
      })
      setTypelist(newTypelist)
    })
    return unsubscribe
  }, [])

  const handleItemDelete = async (id) => {
    await deleteDoc(doc(firestore, 'item', id))
  }

  const handleItemSubmit = async (newitem) => {
    await setDoc(doc(firestore, 'item', newitem.id), newitem)
  }

  const handleTypeSubmit =  async (type) => {
    await addDoc(collection(firestore, 'type'), {type: type})
  }

  return (
    <>
      <AppRouter  data={data} 
                  typelist={typelist}
                  onItemSubmit={handleItemSubmit}
                  onItemDelete={handleItemDelete} 
                  onTypeSubmit={handleTypeSubmit} />
    </>
  );
}

export default App
