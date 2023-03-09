import React, { useRef, useState } from "react";
import classes from "./WorkSpace.module.css";

{
    /* 
          const items = [
              {
                  id: 0,
                  name: 'Patryk',
                  age: 20,
                  height: 169
              },
              {
                  id: 1,
                  name: 'Klaudia',
                  age: 23,
                  height: 170
              },
              {
                  id: 2,
                  name: "bartek",
                  age: 25,
                  height: 196
              },
              {
                  id: 3,
                  name: "Dawid",
                  age: 17,
                  height: 200
              },
              {
                  id: 4,
                  name: "Weronika",
                  age: 18,
                  height: 150
              },
              {
                  id: 5,
                  name: "Kuba",
                  age: 22,
                  height: 190
              }
          ]
          
          const deleteRef = useRef();
              const [data, setData] = useState(items);
          
          
          
              const mapItems = data.map((item) => (
                  <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.age}</td>
                      <td>{item.height}</td>
                  </tr>
              ))
          
              const deleteHandler = (e) => {
                  e.preventDefault();
          
                  const deleteID = +deleteRef.current.value;
          
                  const deletedItems = data.filter((item) => item.id !== deleteID);
                  setData(deletedItems);
          
          
              }
              return (
                  <div className={classes.container}>
                      <table>{mapItems}</table>
                      <form>
                          <label>Podaj ID do usuniecia</label>
                          <input type="number" min='0' max={items.length - 1} ref={deleteRef}></input>
                          <button type="submit" onClick={deleteHandler}>Usuń</button>
                      </form>
                  </div>
              )
          }
          */
}

const arr = [
    "#f5f5f5",
    "#f0ffff",
    "#f5fffa",
    "#f0fff0",
    "#f5f5dc",
    "#fafad2",
    "#ffffe0",
    "#fffacd",
    "#fdfd96",
    "#e6e6fa",
    "#dcdcdc",
    "#ffe4e1",
    "#f0e68c",
    "#f5deb3",
    "#ffe4c4",
    "#eee8aa",
    "#d8bfd8",
    "#d3d3d3",
    "#add8e6",
    "#90ee90",
    "#b0e0e6",
    "#d9d9f3",
    "#ffe4b5",
    "#ffb6c1",
    "#ffdead",
    "#f5b041",
    "#f8d7da",
    "#f4a460",
    "#f0f8ff",
    "#f0e6ff",
    "#f0dc82",
    "#e0ffff",
    "#dcd0ff",
    "#f4f4f4",
    "#e0eee0",
    "#d2b48c",
    "#c7c7c7",
    "#c0c0c0",
    "#b0c4de",
    "#a9a9a9",
    "#9acd32",
    "#87cefa",
    "#778899",
    "#32cd32",
    "#00ced1",

];



const items = arr.map((color) => (
    <div style={{ backgroundColor: color, width: "100px", height: "50px" }}>
        {color}
    </div>
));

const WorkSpace = () => {
    return <div className={classes.container}>{items}</div>;
};

export default WorkSpace;
