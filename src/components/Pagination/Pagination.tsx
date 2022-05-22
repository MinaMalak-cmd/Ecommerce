import React from "react";
import { Pagination as BPagination } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

function Pagination() {
  let active = 2;
  function choosePageNumber(number: any) {
    console.log(number);
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
            active={item === active}
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
