interface IPagination {
  postsPerPage: number;
  totalPosts: number;
  paginate: any;
}

const Pagination = (props: IPagination) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div className="ui inverted vertical center aligned segment">
        <div className="ui container">
          {pageNumbers.map((number) => (
            <button
              className="ui inverted button"
              id="topButton"
              onClick={() => props.paginate(number)}
              key={number}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Pagination;
