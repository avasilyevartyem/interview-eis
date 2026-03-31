import { useState } from 'react';
import { buildPages, type Gap } from './buildPages';
import './Pagination.css';

interface PaginationProps {
  current: number;
  total: number;
  disabled?: boolean;
  onPageChange: (page: number) => void;
}

interface PageButtonProps {
  page: number;
  isActive: boolean;
  disabled: boolean;
  onPageChange: (page: number) => void;
}

interface GapPopupProps {
  gap: Gap;
  disabled: boolean;
  onSelect: (page: number) => void;
}

interface GapItemProps {
  gap: Gap;
  isOpen: boolean;
  disabled: boolean;
  onToggle: () => void;
  onSelect: (page: number) => void;
}

function PageButton({
  page,
  isActive,
  disabled,
  onPageChange,
}: PageButtonProps) {
  const className = `pagination__btn${isActive ? ' pagination__btn--active' : ''}`;

  return (
    <li>
      <button
        className={className}
        onClick={() => onPageChange(page)}
        disabled={disabled || isActive}
        aria-label={`Страница ${page}`}
        aria-current={isActive ? 'page' : undefined}
      >
        {page}
      </button>
    </li>
  );
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

function GapItem({ gap, isOpen, disabled, onToggle, onSelect }: GapItemProps) {
  const className = `pagination__ellipsis${isOpen ? ' pagination__ellipsis--open' : ''}`;

  return (
    <li className="pagination__gap-item">
      <button
        className={className}
        onClick={onToggle}
        aria-label="Показать скрытые страницы"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        ...
      </button>

      {isOpen && (
        <>
          <div className="pagination__backdrop" onPointerDown={onToggle} />
          <GapPopup gap={gap} disabled={disabled} onSelect={onSelect} />
        </>
      )}
    </li>
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

  function handleGapToggle(idx: number) {
    setOpenGapIdx(openGapIdx === idx ? null : idx);
  }

  function handleGapSelect(page: number) {
    onPageChange(page);
    setOpenGapIdx(null);
  }

  return (
    <nav className="pagination" aria-label="Пагинация">
      <ol className="pagination__list">
        {pages.map((item, idx) =>
          typeof item === 'number' ? (
            <PageButton
              key={item}
              page={item}
              isActive={current === item}
              disabled={disabled}
              onPageChange={onPageChange}
            />
          ) : (
            <GapItem
              key={`gap-${idx}`}
              gap={item}
              isOpen={openGapIdx === idx}
              disabled={disabled}
              onToggle={() => handleGapToggle(idx)}
              onSelect={handleGapSelect}
            />
          )
        )}
      </ol>
    </nav>
  );
}
