import AppRouter from '../AppRouter';
import firebase from './firebase';
import { collection, deleteDoc, doc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import useLocalStorage from '../../shared/uselocalstorage';
import { useState } from 'react';

function App() {
  // tallennetaan lisätyt merkinnät tilamuuttujaan
  const [data, setData] = useState([]);
  const [typelist, setTypelist] = useLocalStorage('taloudenhallinta-typelist', []);
  const firestore = getFirestore(firebase);

  useEffect( () => {
    const unsubscribe = onSnapshot(collection(firestore, 'item'), snapshot => {
      const newData = []
      snapshot.forEach( doc => {
        newData.push({ ...doc.data(), id: doc.id })
      })
      setData(newData)
    })
    return unsubscribe
  }, [])

  const handleItemDelete = async (id) => {
    await deleteDoc(doc(firestore, 'item', id))
  }

  const handleItemSubmit = async (newitem) => {
    await setDoc(doc(firestore, 'item', newitem.id), newitem)
  }

  const handleTypeSubmit = (type) => {
    let copy = typelist.slice();
    copy.push(type)
    copy.sort()
    setTypelist(copy);
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
