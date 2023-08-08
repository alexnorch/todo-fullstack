import { useEffect, useRef } from "react";
import { TaskItem } from "./types";

// Components
import TodoItem from "./TodoItem";

const TodoList: React.FC<{ tasks: TaskItem[] }> = ({ tasks }) => {
  const contentRef = useRef<HTMLUListElement>(null);
  const scrollBar = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const renderTaskItems = () => {
    return tasks.length > 0 ? (
      tasks.map((item) => <TodoItem key={item._id} {...item} />)
    ) : (
      <p>Please create your first task</p>
    );
  };

  useEffect(() => {
    const contentEl = contentRef.current!;
    const scrollBarEl = scrollBar.current!;

    contentEl.addEventListener("scroll", handleScroll);

    if (contentEl.clientHeight < 560) {
      scrollBarEl.style.display = "none";
    } else {
      scrollBarEl.style.display = "block";
      updateThumbHeight();
    }

    return () => {
      contentEl.removeEventListener("scroll", handleScroll);
    };
  });

  const handleScroll = () => {
    if (contentRef.current && thumbRef.current) {
      const contentHeight = contentRef.current.scrollHeight; // height of an element's content, including content not visible on the screen due to overflow.
      const containerHeight = contentRef.current.clientHeight; // inner height of an element in pixels.
      const scrollTop = contentRef.current.scrollTop; // gets the number of pixels that an elements' content is scrolled vertically.
      const scrollThumbTop =
        (scrollTop / (contentHeight - containerHeight)) * 100;

      const maxScrollThumbTop = 100 - parseFloat(thumbRef.current.style.height); // parses a value as a string and return the first number
      const clampedScrollThumbTop = Math.min(maxScrollThumbTop, scrollThumbTop);
      thumbRef.current.style.top = `${clampedScrollThumbTop}%`;
    }
  };

  const updateThumbHeight = () => {
    if (contentRef.current && thumbRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      const containerHeight = contentRef.current.clientHeight;
      const thumbHeight = (containerHeight / contentHeight) * 100;
      thumbRef.current.style.height = `${thumbHeight}%`;
    }
  };

  return (
    <div className="task-wrapper">
      <div ref={scrollBar} className="task-wrapper__scrollbar">
        <div ref={thumbRef} className="task-wrapper__scrollbar__thumb"></div>
      </div>
      <ul ref={contentRef} className="tasks">
        {renderTaskItems()}
      </ul>
    </div>
  );
};

export default TodoList;
