import React, {useState, useEffect} from 'react';
import './App.css';
import DataFetch from './dataFetch.js';

function App() {

  const [data, setData] = useState([]);
  const [inputSearch, setInputSearch] = useState([]);
  const [search, setSearch] = useState([]);
  const [filterDisplay, setFilterDisplay] = React.useState([]);
  var view;
  var darkMode = false;

  const getAPI = (town) => {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=236efda6221d4b70885210424211511&q=${town}&days=10&aqi=no&alerts=no`)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        console.log('success');
      });
  };

  useEffect(() => {

    setInputSearch(inputSearch)
    setSearch(inputSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputSearch, search]);



  if(data.length !== 0){
    view = <DataFetch data={data}/>
    if(data.current.is_day === 0){
      darkMode = true
    }
  }else{
    view = <p>Veuillez choisir une ville</p>
  }

 function handleSearch(){
    setSearch(inputSearch);
    console.log('search', search);
    getAPI(search);

 }
  return (
    <div className={`App ${darkMode ? 'theme-dark' : 'theme-light'}`}>
      <div className="c-search_bar">
        <span className="c-search_bar-icon"></span>
        <input className="search-bar" type="text" placeholder="Recherche" value={inputSearch} onChange={e => setInputSearch(e.target.value)}/>
        <button type="button" onClick={handleSearch}>Rechercher</button>
      </div>

      {view}
    </div>
  );
}

export default App;
