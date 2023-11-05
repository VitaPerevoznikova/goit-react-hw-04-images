
import PropTypes from 'prop-types';

import { BiSearchAlt  } from "react-icons/bi";
import { Header,SearchFormButton } from './Searchbar.styled';

 const SearchBar = ({onFormSubmit}) => {

  const handleSubmit = event => {
    event.preventDefault();
    const searchValue = event.target.elements.searchName.value;
    onFormSubmit(searchValue);

    event.target.elements.searchName.value = "";

  }
    return (
      <Header>
        <form onSubmit={handleSubmit} className="SearchForm">
          <SearchFormButton type="submit" className="SearchForm-button">
          
            <BiSearchAlt style={{ width: 25, height: 25 }} />
          </SearchFormButton>
          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchName"
          />
        </form>
      </Header>
    );
  }

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};

export default SearchBar;