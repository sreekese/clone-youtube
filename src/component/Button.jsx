export default function Button({ name, selected, onClick }) {
  return (
    <button
      className={`chip ${selected ? "selected" : ""}`}
      aria-pressed={selected}
      onClick={onClick}
    >
      {name}
    </button>
  );
}
