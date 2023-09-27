import "./OverviewTabs.scss";

interface IOverviewTabs {
  activeTab: string;
  onTabChange: (e: any) => void;
  tabs: any[];
}

const OverviewTabs: React.FC<IOverviewTabs> = ({
  activeTab,
  onTabChange,
  tabs,
}) => {
  const renderTabs = () => {
    return tabs.map(({ name, dataTab }, i) => {
      let classes = "overview-tabs__item";

      if (activeTab === dataTab) {
        classes += " active";
      }

      return (
        <li
          className={classes}
          data-tabName={dataTab}
          onClick={onTabChange}
          key={i}
        >
          {name}
        </li>
      );
    });
  };

  return (
    <div className="overview-tabs__nav">
      <h3 className="overview-tabs__title">My tasks</h3>
      <ul className="overview-tabs__list">{renderTabs()}</ul>
    </div>
  );
};

export default OverviewTabs;
