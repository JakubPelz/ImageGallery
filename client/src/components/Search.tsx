import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ShowGalleries, Gallery } from '../reducers/actions';
import * as BiIcons from 'react-icons/bi';
import '../components/assets/search.css';
import { Link } from 'react-router-dom';

const Search = () => {
  const [filtredData, setFiltredData] = useState<Gallery[]>([]);
  const [searchName, setSearchName] = useState('');

  const Galleries = useSelector<ShowGalleries, Gallery[]>(
    (state) => state.galleries
  );

  const handleFilter = (event: any) => {
    const searchWord = event.target.value;
    setSearchName(searchWord);
    const newFilter = Galleries.filter((value) => {
      return value.gallery_name
        .toLowerCase()
        .includes(searchWord.toLowerCase());
    });
    if (searchWord === '') {
      setFiltredData([]);
    } else {
      setFiltredData(newFilter);
      setSearchName(searchWord);
    }
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    setSearchName(searchName);
  };

  const clearInput = () => {
    setFiltredData([]);
    setSearchName('');
  };

  return (
    <div style={{ margin: '15px' }}>
      <form>
        <div className="ui input">
          <input
            type="text"
            className="input has-text-centered mb-2"
            placeholder="Search for Gallery?"
            id="searchInput"
            value={searchName}
            onChange={handleFilter}
          />
          <div className="iconPosition">
            {filtredData.length === 0 ? (
              <BiIcons.BiSearchAlt onSubmit={onSubmit} />
            ) : (
              <BiIcons.BiXCircle id="clearBtn" onClick={clearInput} />
            )}
          </div>
        </div>
      </form>
      {filtredData.length !== 0 && (
        <div className="centerAligned">
          <div className="dataResult">
            {filtredData.slice(0, 15).map((value, key) => {
              return (
                <p className="dataItem" key={key}>
                  <Link to={`/gallery/${value._id}`}>
                    <li className="liChild">{value.gallery_name}</li>
                  </Link>
                </p>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
