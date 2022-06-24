import React from "react";

export default function HillCard(hill) {
  return (
    <div>
      <h2>{hill.name}</h2>
      <img src={hill.image} />
    </div>
  );
}
