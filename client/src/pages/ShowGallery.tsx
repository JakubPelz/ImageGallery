import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../components/assets/showGalleries.css';
import GalleriesShow from '../components/GalleriesShow';
import { fetchGalleries, Gallery, ShowGalleries } from '../reducers/actions';
import Pagination from '../components/Pagination';
import Search from '../components/Search';

const ShowGallery = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [galleriesPerPage] = useState(10);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGalleries());
  }, [dispatch]);

  const Galleries = useSelector<ShowGalleries, Gallery[]>(
    (state) => state.galleries
  );

  //Pagination
  const indexOfLastPost = currentPage * galleriesPerPage;
  const indexOfFirstPost = indexOfLastPost - galleriesPerPage;
  const currentGalleries = Galleries.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="ui item center aligned segment">
        <h1>Display all Galleries</h1>
        "Total galleries uploaded: {Galleries.length}"
        <Search />
        <div className="ui item grid center aligned segment">
          <GalleriesShow galleries={currentGalleries} />
        </div>
        <Pagination
          postsPerPage={galleriesPerPage}
          totalPosts={Galleries.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default ShowGallery;
