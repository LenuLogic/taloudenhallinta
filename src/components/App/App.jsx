import AppRouter from '../AppRouter';
import useLocalStorage from '../../shared/uselocalstorage';
import { useState } from 'react';

function App() {
  // tallennetaan lisätyt merkinnät tilamuuttujaan
  const [data, setData] = useLocalStorage('taloudenhallintadata', []);
  const [typelist, setTypelist] = useLocalStorage('taloudenhallinta-typelist', []);

  const handleItemDelete = (id) => {
    let copy = data.slice();
    copy = copy.filter(item => item.id !== id)
    setData(copy);
  }

  // tallentaa lisätyt tiedot,
  // tarkistaa onko lisätyn tiedon indeksiä jo olemassa 
  // ja sorttaa kaikki tiedot uusimman maksupäivän mukaan.
  const handleItemSubmit = (newitem) => {
    let copy = data.slice();

    const index = copy.findIndex(item => item.id === newitem.id)
    if (index >=0) {
      copy[index] = newitem
    } else {
    copy.push(newitem);
    }

    copy.sort( (a,b) => {
      const aDate = new Date(a.paymentDate)
      const bDate = new Date(b.paymentDate)
      return bDate-aDate;
    })
    setData(copy);
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
