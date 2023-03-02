import React, { useRef, useState } from 'react'
import classes from './WorkSpace.module.css'

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


const WorkSpace = () => {
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

export default WorkSpace