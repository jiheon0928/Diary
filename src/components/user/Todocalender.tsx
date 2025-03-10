import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import targetStore from "../hooks.tsx/hooks";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Todocalender = () => {
  const [value, onValue] = useState<Value>(new Date());
  const {
    value: inputText,
    setValue,
    addList,
    valueList,
    toggleCompletion,
  } = targetStore();

  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleClickDay = (date: Date) => {
    const nowday = date.toLocaleDateString();
    setSelectedDate(nowday);
  };

  const handleAddTask = () => {
    if (selectedDate && inputText) {
      addList(selectedDate);
    }
  };

  const handleCheckboxChange = (index: number) => {
    toggleCompletion(index, selectedDate);
  };
  return (
    <div className="flex gap-4 p-5 bg-yellow-100">
      <Calendar onChange={onValue} value={value} onClickDay={handleClickDay} />
      <div>
        <span className=" px-4 py-2 border-solid border-4 rounded-xl border-indigo-700 ">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setValue(e.target.value)}
            placeholder="get todolist"
          />
          <button
            className="px-4 py-1 border-4 border-indigo-500 rounded-xl bg-indigo-400"
            onClick={handleAddTask}>
            추가
          </button>
        </span>

        <div>
          <h3>{selectedDate}</h3>
          <ul>
            {valueList[selectedDate]?.map((item, index) => (
              <li
                key={item.id}
                style={{
                  textDecoration: item.completed ? "line-through" : "none",
                }}>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleCheckboxChange(index)}
                />
                {item.text}
                <button
                  onClick={() =>
                    targetStore.getState().removeList(index, selectedDate)
                  }>
                  할일 삭제
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Todocalender;
