import "./TodoFilter.scss";

interface ITodoFilter {
  activeFilter: string;
  onChangeFilter: (e: any) => void;
  filters: any[];
}

const TodoFilter: React.FC<ITodoFilter> = (props) => {
  const { activeFilter, filters, onChangeFilter } = props;

  const renderFilterOptions = () => {
    return filters.map(({ name, dataTab }, i) => {
      let classes = "todo-filter__option";

      if (activeFilter === dataTab) {
        classes += " todo-filter__option_active";
      }

      return (
        <li
          className={classes}
          data-tabName={dataTab}
          onClick={onChangeFilter}
          key={i}
        >
          {name}
        </li>
      );
    });
  };

  return (
    <div className="todo-filter">
      <h3 className="todo-filter__title">My tasks</h3>
      <ul className="todo-filter__options">{renderFilterOptions()}</ul>
    </div>
  );
};

export default TodoFilter;
