import React, { FC, useState, FormEvent } from 'react';

interface SearchProps {
  title: string;
}

const Search: FC<SearchProps> = ({ title }) => {
  const [searchName, setSearchName] = useState('');

  const changeHandler = (e: FormEvent<HTMLInputElement>) => {
    setSearchName(e.currentTarget.value);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchName.trim() === '') {
      //add TODO value...
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="ui small icon input">
        <input
          type="text"
          className="input has-text-centered mb-2"
          placeholder="Enter city name"
          style={{ maxWidth: 300 }}
          value={searchName}
          onChange={changeHandler}
        />
        <i className="search icon"></i>
      </div>
    </form>
  );
};

export default Search;
