import './Loader.css';

interface LoaderProps {
  size?: number;
  label?: string;
}

export function Loader({ size = 44, label = 'Загрузка…' }: LoaderProps) {
  return (
    <div className="loader" role="status" aria-label={label}>
      <svg
        className="loader__spinner"
        viewBox="0 0 50 50"
        fill="none"
        style={{ width: size, height: size }}
      >
        <circle
          className="loader__track"
          cx="25"
          cy="25"
          r="20"
          strokeWidth="4"
        />
        <circle
          className="loader__arc"
          cx="25"
          cy="25"
          r="20"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
