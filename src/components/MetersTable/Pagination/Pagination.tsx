import { useState } from 'react';
import { buildPages, type Gap } from './buildPages';
import './Pagination.css';

interface PaginationProps {
  current: number;
  total: number;
  disabled?: boolean;
  onPageChange: (page: number) => void;
}

interface GapPopupProps {
  gap: Gap;
  disabled: boolean;
  onSelect: (page: number) => void;
}

function GapPopup({ gap, disabled, onSelect }: GapPopupProps) {
  return (
    <div
      className="pagination__gap-popup"
      role="listbox"
      aria-label="Скрытые страницы"
    >
      {gap.pages.map((p) => (
        <button
          key={p}
          className="pagination__btn pagination__gap-popup__btn"
          role="option"
          aria-selected={false}
          disabled={disabled}
          onClick={() => onSelect(p)}
        >
          {p}
        </button>
      ))}
    </div>
  );
}

export function Pagination({
  current,
  total,
  disabled = false,
  onPageChange,
}: PaginationProps) {
  const [openGapIdx, setOpenGapIdx] = useState<number | null>(null);

  if (total <= 1) return null;

  const pages = buildPages(current, total);

  return (
    <nav className="pagination" aria-label="Пагинация">
      <ol className="pagination__list">
        {pages.map((item, idx) => {
          if (typeof item === 'number') {
            return (
              <li key={item}>
                <button
                  className={`pagination__btn${current === item ? ' pagination__btn--active' : ''}`}
                  onClick={() => onPageChange(item)}
                  disabled={disabled || current === item}
                  aria-label={`Страница ${item}`}
                  aria-current={current === item ? 'page' : undefined}
                >
                  {item}
                </button>
              </li>
            );
          }

          const isOpen = openGapIdx === idx;
          return (
            <li key={`gap-${idx}`} className="pagination__gap-item">
              <button
                className={`pagination__ellipsis${isOpen ? ' pagination__ellipsis--open' : ''}`}
                onClick={() => setOpenGapIdx(isOpen ? null : idx)}
                aria-label={`Показать скрытые страницы `}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
              >
                ...
              </button>

              {isOpen && (
                <>
                  <div
                    className="pagination__backdrop"
                    onPointerDown={() => setOpenGapIdx(null)}
                  />
                  <GapPopup
                    gap={item}
                    disabled={disabled}
                    onSelect={(p) => {
                      onPageChange(p);
                      setOpenGapIdx(null);
                    }}
                  />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
