import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../../Components/SearchBar";
import useViewModel from "../../Models/Hill/HillModel";

export default function IndexHills() {
  const { hills } = useViewModel();
  return (
    <div>
      <div>
        <SearchBar />
        <Link to="/create-hill">
          <button className="inline mx-10">Create a Hill</button>
        </Link>
      </div>
      <div className="border-2	border-black mx-3 my-1 grid grid-cols-4">
        {hills.map((hill, i) => (
          <div className="w-48" key={i}>
            <Link to={`/hill/${hill.id}`} key={i}>
              <h2>{hill.name}</h2>
              <img src={hill.image} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
