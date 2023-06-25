import "./styles.css";
import { useState } from "react";

const TodoList = (props) => {
  const [update, setUpdate] = useState(false);
  const [updatedData, SetUpdatedData] = useState("");
  const updateHandler = (e) => {
    if (update) {
      props.onUpdate(updatedData, e.target.id);
    }
    setUpdate(!update);
    // console.log(e);
  };

  const handleUpdateChange = (e) => {
    SetUpdatedData(e.target.value);
  };

  return (
    <div className="todo-container">
      <div>
        {update === true ? (
          <form className="list">
            <input name="text2" type="text" onChange={handleUpdateChange} />
          </form>
        ) : (
          <ul className="list">
            <li>{props.data.text1}</li>
            <li>{props.data.text2}</li>
          </ul>
        )}
      </div>
      <div className="btns">
        <button id={props.id} onClick={updateHandler}>
          {update ? "Save" : "Update"}
        </button>
        <button onClick={() => props.deletHandler(props.id)}>Delet</button>
      </div>
    </div>
  );
};
export default function App() {
  const [data, setData] = useState([]);
  const deletHandler = (key) => {
    console.log("clickkk", key);
    let filterD = data.filter((ele, i) => i !== key);
    setData(filterD);
    console.log(filterD, "jdhfjk");
  };

  const AddTodo = (e) => {
    let val = e.target[0].value;
    setData([...data, { text1: val }]);
    console.log(data);
    e.target[0].value = "";
    e.preventDefault();
  };

  const onUpdate = (str, id) => {
    let obj = data.map((d, idx) => {
      if (id == idx) {
        d.text1 = str;
      }
      return d;
    });
    setData(obj);
  };
  console.log();
  return (
    <div className="App">
      <form onSubmit={AddTodo}>
        <label>Enter todod </label>
        <input name="text1" type="text" />
        {/* <input name="text2" type="text" /> */}
        <input type="submit"></input>
      </form>
      {data.map((d, idx) => {
        return (
          <TodoList
            id={idx}
            data={d}
            deletHandler={deletHandler}
            onUpdate={onUpdate}
          />
        );
      })}
    </div>
  );
}
