import { useState } from "react";
import newHill from "../../../Domain/UseCase/Hill/NewHill";
import newCharacter from "../../../Domain/UseCase/Character/NewCharacter";
import { useNavigate } from "react-router-dom";

export default function CreateHillModel() {
  const navigate = useNavigate();
  const [hillValues, setHillValues] = useState({
    name: "",
    description: "",
    image: "",
  });

  const [characters, setCharacters] = useState([]);

  const [characterValue, setCharacterValue] = useState({
    name: "",
    description: "",
    image: "",
  });

  function onHillChange(value, prop) {
    setHillValues({ ...hillValues, [prop]: value });
  }

  function onCharacterChange(value, prop) {
    setCharacterValue({ ...characterValue, [prop]: value });
  }

  const saveHill = async () => {
    const hill = await newHill(hillValues);
    for (let character of characters) {
      await newCharacter(character, hill.id);
    }
    navigate(`/hill/${hill.id}`, { replace: true });
  };

  const addCharacter = () => {
    setCharacters([...characters, characterValue]);
  };

  const deleteCharacter = (index) => {
    return () => {
      const temp = characters.filter((_v, i) => i !== index);
      setCharacters(temp);
    };
  };

  return {
    ...hillValues,
    characterValue,
    saveHill,
    onHillChange,
    addCharacter,
    deleteCharacter,
    onCharacterChange,
    characters,
  };
}
