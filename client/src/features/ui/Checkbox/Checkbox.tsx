import "./Checkbox.scss";

interface ICheckbox {
  onCheck: () => void;
  checked: boolean;
}

const Checkbox: React.FC<ICheckbox> = ({ checked, onCheck }) => {
  return (
    <div className="checkbox">
      <input
        className="checkbox__input"
        checked={checked}
        id="check"
        type="checkbox"
        readOnly
      />
      <label
        onClick={onCheck}
        className="checkbox__label"
        htmlFor="check"
      ></label>
    </div>
  );
};

export default Checkbox;
