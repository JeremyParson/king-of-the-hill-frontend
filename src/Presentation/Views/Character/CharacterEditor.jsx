import React from "react";

export default function CharacterEditor(
  addCharacter,
  deleteCharacter,
  onCharacterChange,
  characterValue
) {
  const handleSubmit = (e) => {
    e.preventDefault();
    addCharacter();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={characterValue.name}
          onChange={(e) => onCharacterChange(e.target.value, e.target.name)}
        ></input>
      </form>
    </div>
  );
}
