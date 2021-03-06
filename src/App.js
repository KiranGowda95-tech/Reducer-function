import "./styles.css";
import React, { useState, useReducer } from "react";
import Modal from "./Modal";
import data from "./data";
import { reducer } from "./Reducer";

const defaultState = {
  people: [],
  isModalOpen: false,
  modalContent: ""
};

export default function App() {
  const [name, setName] = useState("");
  const [state, dispatch] = useReducer(reducer, defaultState);
  // const [people, setPeople] = useState(data);
  // const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      const newItem = { id: new Date().getTime().toString(), name };
      dispatch({ type: "ADD_ITEM", payload: newItem });
      setName("");
    } else {
      dispatch({ type: "NO_VALUE" });
    }
  };

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <div className="App">
      {state.isModalOpen && (
        <Modal closeModal={closeModal} modalContent={state.modalContent} />
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
      {state.people.map((person, index) => {
        return (
          <div key={person.id}>
            <ul>
              <li>
                <h2>{person.name}</h2>
                <h4>{person.job}</h4>
                <button
                  type="button"
                  onClick={() =>
                    dispatch({ type: "REMOVE_ITEM", payload: person.id })
                  }
                >
                  remove
                </button>
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
}
