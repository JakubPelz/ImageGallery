/* import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ShowGalleries, Gallery } from '../reducers/actions';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { getBasePath } from '../utils/PathHelper'; */
interface IPagination {
  Pages?: number;
  ItemsPerPage: number;
}

const Pagination = ({ Pages, ItemsPerPage }: IPagination) => {
  /*   const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [galleriesPerPage] = useState(10);

  useEffect(() => {
    const fetchGalleries = async () => {
      setLoading(true);
      const res = await axios.get(`${getBasePath()}/api/show-galleries`);
      setGalleries(res.data);
      setLoading(false);
    };
    fetchGalleries();
  }, []);

  //Get current galleries
  const indexOfLastGallery = pageNumber * galleriesPerPage;
  const indexOfFirstGallery = indexOfLastGallery - galleriesPerPage;
  const currentGalleries = galleries.slice(
    indexOfFirstGallery,
    indexOfLastGallery
  );
 */
  //Change page

  return <div>{ItemsPerPage}</div>;
};

export default Pagination;
