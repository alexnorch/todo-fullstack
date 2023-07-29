import { useState } from "react";

// Settings tab
import Profile from "./Profile";
import Categories from "./Categories";
import Theme from "./Theme";

const tabs = ["Profile", "Categories", "Theme"];

export default function Wrapper() {
  const [tab, setTab] = useState<string>("Profile");

  const renderLinks = tabs.map((tabName, i) => {
    let tabClasses =
      tab.toLocaleLowerCase() === tabName.toLocaleLowerCase()
        ? "settings__nav__item active"
        : "settings__nav__item";
    return (
      <li className={tabClasses} key={i} onClick={() => setTab(tabName)}>
        {tabName}
      </li>
    );
  });

  const renderTab = (currentTab: string) => {
    switch (currentTab.toLocaleLowerCase()) {
      case "profile":
        return <Profile />;
      case "categories":
        return <Categories />;
      case "theme":
        return <Theme />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="settings">
      <div className="settings__heading">
        <h2>Settings</h2>
        <hr />
      </div>
      <ul className="settings__nav">{renderLinks}</ul>
      <div className="settings__content">{renderTab(tab)}</div>
    </div>
  );
}
