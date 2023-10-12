import "./TodoFilter.scss";
import { IFilterOptions, FilterType } from "../types";

interface ITodoFilter {
  filterOptions: IFilterOptions[];
  activeFilter: FilterType;
  setActiveFilter: any;
}

const TodoFilter: React.FC<ITodoFilter> = (props) => {
  const { activeFilter, filterOptions, setActiveFilter } = props;

  const onChangeFilter = (filterIndex: number) => {
    setActiveFilter(filterOptions[filterIndex].filterType);
  };

  const renderFilterOptions = () => {
    return filterOptions.map(({ title, filterType }, i) => {
      let classes = "todo-filter__option";

      if (activeFilter === filterType) {
        classes += " todo-filter__option_active";
      }

      return (
        <li key={i} className={classes} onClick={() => onChangeFilter(i)}>
          {title}
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
