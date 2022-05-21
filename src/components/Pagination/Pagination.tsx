import React from "react";
import { Pagination as BPagination } from "react-bootstrap";

function Pagination() {
  let active = 2;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(number);
  }
  function choosePageNumber(number: any) {
   console.log(number);
  }
  return (
    <div className="mt-3 text-center col-12 m-auto w-25">
      <BPagination>
        <BPagination.First />
        <BPagination.Prev />
        {items.map((item) => (
          <BPagination.Item key={item} active={item === active} onClick={()=>choosePageNumber(item)}>
            {item}
          </BPagination.Item>
        ))}
        <BPagination.Next />
        <BPagination.Last />
      </BPagination>
    </div>
  );
}

export default Pagination;
