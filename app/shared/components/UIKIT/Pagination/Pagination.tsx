import React from 'react';
import PaginationItem from './PaginationItem';
import s from './Pagination.module.scss';
import { useSortStore } from '@/app/shared/core/providers/sortProvider';

export default function Pagination({ page, pages }: { page: number; pages: number }) {
  const { changePage } = useSortStore(store => store);

  const prevPage = () => {
    if (page !== 1) changePage(page - 1);
  };
  const nextPage = () => {
    if (page !== pages) changePage(page + 1);
  };

  // Если страница одна — пагинация не нужна
  if (pages === 1) {
    return null;
  }

  // Если страниц 2 — показываем просто 1 и 2
  if (pages === 2) {
    return (
      <div className={s.Pagination}>
        <div className={s.Pagination__arrow_left} onClick={prevPage}>
          <ArrowUp />
        </div>
        <div className={s.Pagination__items}>
          <PaginationItem page={1} active={page === 1} />
          <PaginationItem page={2} active={page === 2} />
        </div>
        <div className={s.Pagination__arrow_right} onClick={nextPage}>
          <ArrowDown />
        </div>
      </div>
    );
  }

  // Если страниц 3 — показываем 1, 2, 3
  if (pages === 3) {
    return (
      <div className={s.Pagination}>
        <div className={s.Pagination__arrow_left} onClick={prevPage}>
          <ArrowUp />
        </div>
        <div className={s.Pagination__items}>
          <PaginationItem page={1} active={page === 1} />
          <PaginationItem page={2} active={page === 2} />
          <PaginationItem page={3} active={page === 3} />
        </div>
        <div className={s.Pagination__arrow_right} onClick={nextPage}>
          <ArrowDown />
        </div>
      </div>
    );
  }

  // Если страниц 4 — показываем 1, 2, 3, 4
  if (pages === 4) {
    return (
      <div className={s.Pagination}>
        <div className={s.Pagination__arrow_left} onClick={prevPage}>
          <ArrowUp />
        </div>
        <div className={s.Pagination__items}>
          <PaginationItem page={1} active={page === 1} />
          <PaginationItem page={2} active={page === 2} />
          <PaginationItem page={3} active={page === 3} />
          <PaginationItem page={4} active={page === 4} />
        </div>
        <div className={s.Pagination__arrow_right} onClick={nextPage}>
          <ArrowDown />
        </div>
      </div>
    );
  }

  // Если страниц 5 — показываем 1, 2, 3, 4, 5
  if (pages === 5) {
    return (
      <div className={s.Pagination}>
        <div className={s.Pagination__arrow_left} onClick={prevPage}>
          <ArrowUp />
        </div>
        <div className={s.Pagination__items}>
          <PaginationItem page={1} active={page === 1} />
          <PaginationItem page={2} active={page === 2} />
          <PaginationItem page={3} active={page === 3} />
          <PaginationItem page={4} active={page === 4} />
          <PaginationItem page={5} active={page === 5} />
        </div>
        <div className={s.Pagination__arrow_right} onClick={nextPage}>
          <ArrowDown />
        </div>
      </div>
    );
  }

  // Стандартная логика для 6+ страниц (существующий код)
  return (
    <div className={s.Pagination}>
      <div className={s.Pagination__arrow_left} onClick={prevPage}>
        <ArrowUp />
      </div>
      <div className={s.Pagination__items}>
        {/* first */}
        <PaginationItem page={1} active={page === 1} />

        {page === 1 && (
          <div className={s.Pagination__items__mid}>
            <PaginationItem page={page + 1} active={false} />
            <PaginationItem page={page + 2} active={false} />
            ...
          </div>
        )}

        {page === 2 && (
          <div className={s.Pagination__items__mid}>
            <PaginationItem page={page} active={true} />
            <PaginationItem page={page + 1} active={false} />
            ...
          </div>
        )}

        {page === 3 && (
          <div className={s.Pagination__items__mid}>
            <PaginationItem page={page - 1} active={false} />
            <PaginationItem page={page} active={true} />
            <PaginationItem page={page + 1} active={false} />
            ...
          </div>
        )}

        {page > 3 && page < pages - 2 && (
          <div className={s.Pagination__items__mid}>
            ...
            <PaginationItem page={page - 1} active={false} />
            <PaginationItem page={page} active={true} />
            <PaginationItem page={page + 1} active={false} />
            ...
          </div>
        )}

        {page === pages - 2 && (
          <div className={s.Pagination__items__mid}>
            ...
            <PaginationItem page={page - 1} active={false} />
            <PaginationItem page={page} active={true} />
            <PaginationItem page={page + 1} active={false} />
          </div>
        )}

        {page === pages - 1 && (
          <div className={s.Pagination__items__mid}>
            ...
            <PaginationItem page={page - 1} active={false} />
            <PaginationItem page={page} active={true} />
          </div>
        )}

        {page === pages && (
          <div className={s.Pagination__items__mid}>
            ...
            <PaginationItem page={page - 2} active={false} />
            <PaginationItem page={page - 1} active={false} />
            <PaginationItem page={page} active={true} />
          </div>
        )}

        {/* last */}
        {page !== pages && <PaginationItem page={pages} active={page === pages} />}
      </div>
      <div className={s.Pagination__arrow_right} onClick={nextPage}>
        <ArrowDown />
      </div>
    </div>
  );
}

function ArrowUp() {
  return (
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 0.295L0 6.295L1.41 7.705L6 3.125L10.59 7.705L12 6.295L6 0.295Z" fill="black" />
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 0.295L0 6.295L1.41 7.705L6 3.125L10.59 7.705L12 6.295L6 0.295Z" fill="black" />
    </svg>
  );
}
