import React, { useState } from "react";
import axiosWithAuth from "../utilites/axiosWithAuth";

import { Button } from 'semantic-ui-react';

const initialColor = {
  color: "",
  code: { hex: "" }
};

// const sendColor = {
//   color: "",
//   code: { hex: "" }
// };

const ColorList = ({ colors, updateColors, update, setUpdate }) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [adding, setAdding] = useState(false);
  const [colorToAdd, setColorToAdd] = useState(initialColor)
  
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const addColor = () => {
    axiosWithAuth()
    .post(`http://localhost:5000/api/colors`, colorToAdd)
    .then(res => {
      console.log(`Color ${colorToAdd.color} was added`, res)
      setColorToAdd(initialColor)
      setUpdate(!update)
    })
    .catch(err => console.log(err))
  }


  const addColorTab = () => {
    setAdding(true);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log(`Updated data of ${colorToEdit.color}`, res);
        setUpdate(!update)
    })
      .catch(err => console.log('Oh-oh, something wrong', err));
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res => {
        console.log(`${color.color} color was deleted`, res);
        setUpdate(!update)
    })
      .catch(err => console.log('Oh-oh, something wrong', err));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      <Button onClick={() => addColorTab()}>Add color</Button>

      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}


      {adding && (
        <form>
        <legend>add color</legend>
        <label>
          color name:
          <input
            type='text'
            name='color'
            onChange={event => 
              setColorToAdd({ ...colorToAdd, color: event.target.value })
            }
            placeholder='color name'
            value={colorToAdd.color}
          />
        </label>

        <label>
          hex code:
          <input
            type='text'
            name='hex'
            onChange={event => 
              setColorToAdd({ ...colorToAdd, code: { hex: event.target.value }})}
            placeholder="hex code"
            value={colorToAdd.code.hex}
          />
        </label>

        <div className="button-row">
          <button type='button' onClick={() => addColor()}>submit</button>
          <button onClick={() => setAdding(false)}>cancel</button>
        </div>
      </form>
      )}

      <div className="spacer" />

 

    </div>
  );
};

export default ColorList;
