import react,{useState} from "react";
import { Pagination as BPagination } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../../store/index";

function Pagination() {
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState(1);
  function choosePageNumber(number: any) {
    setActivePage(number);
    dispatch(productActions.paginateProducts({ page: number }));
  }
  const pageLimit = useSelector((state: any) => state.product.totalPages);
  let items = [];
  for (let number = 1; number <= pageLimit; number++) {
    items.push(number);
  }

  return (
    <div className="mt-3 text-center col-12 m-auto w-25">
      <BPagination>
        {/* <BPagination.First />
        <BPagination.Prev /> */}
        {items.map((item) => (
          <BPagination.Item
            key={item}
            active={item === activePage}
            onClick={() => choosePageNumber(item)}
          >
            {item}
          </BPagination.Item>
        ))}
        {/* <BPagination.Next />
        <BPagination.Last /> */}
      </BPagination>
    </div>
  );
}

export default Pagination;
