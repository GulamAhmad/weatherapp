/* eslint-disable react/prop-types */
import { AsyncPaginate } from "react-select-async-paginate";
import searchLogo from "../assets/search.svg";
import { useEffect, useState } from "react";


const Search = ({onSearch}) => {
  const [search, setSearch] = useState({ label: 'Mumbai, Maharashtra', value: '19.0785451 72.878176' });
  
  const handleonChange = (searchData) => {
    setSearch(searchData);
    onSearch(searchData)
  };

  const loadOption =(inputValue)=>{
    return fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=${import.meta.env.VITE_APP_API_KEY}`)
    .then(response => response.json())
    .then(response => {
      return {
          options : response.map(city=>{
            return {
              value: `${city.lat} ${city.lon}`,
              label: `${city.name}, ${city.state || city.country}`
            }
          })   
      };
    })
    .catch(err => {
      console.log(err);
      return {
        options: [],
        hasMore: false,
      };
    });
  }

  useEffect(() => {
    // Load options from API on component mount
    loadOption(search.label).then((initialOptions) => {
      setSearch((prevSearch) => ({
        ...prevSearch,
        options: initialOptions,
      }));
      onSearch(initialOptions.options[0])
    });
  }, []);

  return (
    <div className="searchbar">
      <AsyncPaginate
        className="input"
        placeholder="Search your city here..."
        debounceTimeout={600}
        value={search}
        onChange={handleonChange}
        loadOptions={(inputValue, loadedOptions) =>
          loadOption(inputValue, loadedOptions)
        }
      />
      <img src={searchLogo} alt="serach icon" />
    </div>
  );
};

export default Search;
