import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PaginationCom = ({ tableData, setCurrentPage, totalPages, currentPage, itemsPerPage }) => {
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPaginationItems = () => {
    const paginationItems = [];

    // Display previous button if not on the first page
    if (currentPage !== 1) {
      paginationItems.push(
        <PaginationItem key="prev">
          <PaginationPrevious onClick={() => paginate(currentPage - 1)} />
        </PaginationItem>
      );
    }

    // Display page numbers or ellipsis
    for (let i = 1; i <= totalPages; i++) {
      if (totalPages <= 3 || Math.abs(currentPage - i) < 2) {
        paginationItems.push(
          <PaginationItem key={i}>
            <PaginationLink onClick={() => paginate(i)}>{i}</PaginationLink>
          </PaginationItem>
        );
      } else if (
        (i === 2 && currentPage - 1 > 2) ||
        (i === totalPages - 1 && totalPages - currentPage > 2)
      ) {
        paginationItems.push(
          <PaginationItem key={i}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    // Display next button if not on the last page
    if (currentPage !== totalPages) {
      paginationItems.push(
        <PaginationItem key="next">
          <PaginationNext onClick={() => paginate(currentPage + 1)} />
        </PaginationItem>
      );
    }

    return paginationItems;
  };

  return (
    <div>
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            {renderPaginationItems()}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default PaginationCom;
