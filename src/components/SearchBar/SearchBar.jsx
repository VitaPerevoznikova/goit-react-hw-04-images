import { useState } from 'react';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
import { BiSearchAlt  } from "react-icons/bi";
import { Header,SearchFormButton } from './Searchbar.styled';

 export const SearchBar = ({onSubmit}) => {
  const [searchName, setSearchName] = useState('');

  const handleChange = event => {
    setSearchName(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchName.trim() === '') {
      Notiflix.Notify.failure('Please enter a value to search!');
      return;
    }
    onSubmit(searchName);
    resetForm();
  };

  const resetForm = () => {
    setSearchName('');
  };

    return (
      <Header>
        <form onSubmit={handleSubmit} className="SearchForm">
          <SearchFormButton type="submit" className="SearchForm-button">
            {/* <span className="SearchForm-button-label">Search</span>  */}
            <BiSearchAlt style={{ width: 25, height: 25 }} />
          </SearchFormButton>
          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchName"
            onChange={handleChange}
            value={searchName}
          />
        </form>
      </Header>
    );
  }

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};

export default SearchBar;