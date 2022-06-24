import React from "react";
import { Link } from "react-router-dom";
import useViewModel from "../../Models/Hill/HillDetailModel";

export default function HillDetail() {
  const { hill, canEdit } = useViewModel();
  const renderCharacters = () =>
    hill.characters.map((character, i) => (
      <div key={i}>
        <p>{character.name}</p>
        <img src={character.image} />
      </div>
    ));
  return (
    <div>
      <div className="flex flex-row justify-evenly">
        <div>
          <h1>{hill.name}</h1>
          <img src={hill.image} className="w-80" />
        </div>
        <p>{hill.description}</p>
        <div>
          <button>Start</button>
          <br></br>
          {canEdit ? (
            <Link to={`/edit/${hill.id}`}>
              <button>Edit</button>
            </Link>
          ) : null}
        </div>
      </div>
      <div className="grid grid-cols-4 border-2 border-black mx-3 my-1 py-1 px-1">
        {hill?.characters ? renderCharacters() : null}
      </div>
    </div>
  );
}
