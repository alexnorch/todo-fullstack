import { useState } from "react";

// Icons
import { CgProfile } from "react-icons/cg";
import { BiCategory } from "react-icons/bi";
import { BsPalette } from "react-icons/bs";

// Settings tab
import Profile from "./Profile";
import Categories from "./Categories";
import Theme from "./Theme";

const tabs = [
  { title: "Profile", icon: <CgProfile /> },
  { title: "Categories", icon: <BiCategory /> },
  { title: "Theme", icon: <BsPalette /> },
];

export default function Wrapper() {
  const [tab, setTab] = useState<string>("Profile");

  const renderLinks = tabs.map((link, i) => {
    let tabClasses =
      tab.toLocaleLowerCase() === link.title.toLocaleLowerCase()
        ? "settings__nav__item active"
        : "settings__nav__item";
    return (
      <li className={tabClasses} key={i} onClick={() => setTab(link.title)}>
        {link.title}
        {link.icon}
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
      <ul className="settings__nav">{renderLinks}</ul>
      <div className="settings__content">{renderTab(tab)}</div>
    </div>
  );
}
