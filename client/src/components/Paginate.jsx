import React from "react";
import { Pagination } from "react-bootstrap";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <Pagination style={{ justifyContent: "end" }}>
        {[...Array(pages).keys()].map((x) => (
          <Pagination.Item
            style={{ color: "#012f41" }}
            href={`/projects/page/${x + 1}`}
            active={x + 1 === page}
          >
            {x + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
