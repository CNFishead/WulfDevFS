import React from "react";
import { Pagination } from "react-bootstrap";

const Paginate = ({ pages, page }) => {
  return (
    pages > 1 && (
      <Pagination style={{ justifyContent: "center" }}>
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
