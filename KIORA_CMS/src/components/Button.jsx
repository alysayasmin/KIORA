export default function Button({ properti, onClick, className, type="button"}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
    >
      {properti}
    </button>
  );
}
