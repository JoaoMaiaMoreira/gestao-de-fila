import "./MeuInput.css";

function MeuInput({ placeholder, label, handlerOnChange }) {
  return (
    <div className="label">
      <label>{label}</label>
      <input
        className="Myinput"
        placeholder={placeholder}
        onChange={(e) => handlerOnChange(e)}
      />
    </div>
  );
}

export default MeuInput;
