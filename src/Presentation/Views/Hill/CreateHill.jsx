import React from "react";
import useViewModel from "../../Models/Hill/CreateHillModel";
import CharacterEditor from "../Character/CharacterEditor";

export default function CreateHill(hill) {
  const {
    name,
    description,
    image,
    characters,
    saveHill,
    onHillChange,
    addCharacter,
    deleteCharacter,
    onCharacterChange,
    characterValue,
  } = useViewModel();

  const handleHillSubmit = (e) => {
    e.preventDefault();
    saveHill();
  };

  const handleCharacterSubmit = (e) => {
    e.preventDefault();
    addCharacter();
  };

  return (
    <div>
      <form onSubmit={handleHillSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => onHillChange(e.target.value, e.target.name)}
          className="border-2	border-black mx-3 my-1"
        ></input>
        <br></br>
        <label>Description</label>
        <br></br>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => onHillChange(e.target.value, e.target.name)}
          className="border-2	border-black mx-3 my-1"
          rows="4"
          cols="50"
        ></textarea>
        <br></br>
        <label>Image</label>
        <input
          type="text"
          name="image"
          value={image}
          onChange={(e) => onHillChange(e.target.value, e.target.name)}
          className="border-2	border-black mx-3 my-1"
        ></input>
        <br></br>
        <input
          type="submit"
          value="Create Hill"
          className="border-2 border-black mx-3 my-1 py-1 px-1"
        />
      </form>

      <form onSubmit={handleCharacterSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={characterValue.name}
          onChange={(e) => onCharacterChange(e.target.value, e.target.name)}
          className="border-2	border-black mx-3 my-1"
        ></input>
        <br></br>
        <label>Image</label>
        <input
          type="text"
          name="image"
          value={characterValue.image}
          onChange={(e) => onCharacterChange(e.target.value, e.target.name)}
          className="border-2	border-black mx-3 my-1"
        ></input>
        <br></br>
        <input
          type="submit"
          value="Add Character"
          className="border-2 border-black mx-3 my-1 py-1 px-1"
        />
      </form>
      <div className="grid grid-cols-4 border-2 border-black mx-3 my-1 py-1 px-1">
        {characters.map((character, i) => (
          <div onClick={deleteCharacter(i)} key={i}>
            <p>{character.name}</p>
            <img src={character.image}/>
          </div>
        ))}
      </div>
    </div>
  );
}
