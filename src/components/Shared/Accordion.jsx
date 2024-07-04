export function Accordion(props) {
  return (
    <div className="bg-gray-100 hover:bg-gray-200 rounded-xl">
      <button
        className="w-full p-4 text-left transition duration-300"
        onClick={props.onToggle}
      >
        <span className="font-bold">{props.title}</span>
        <span
          className={`float-right transform ${
            props.isOpen ? "rotate-180" : "rotate-0"
          } transition-transform duration-300`}
        >
          &#9660;
        </span>
      </button>
      {props.isOpen && (
        <div className="p-4 bg-white border-x border-b border-gray-200 rounded-xl text-justify">
          {props.data}
        </div>
      )}
    </div>
  );
}
