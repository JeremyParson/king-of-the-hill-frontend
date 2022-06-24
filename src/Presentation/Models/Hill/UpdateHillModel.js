import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import changeHill from "../../../Domain/UseCase/Hill/ChangeHill"
import newCharacter from "../../../Domain/UseCase/Character/NewCharacter";
import removeCharacter from "../../../Domain/UseCase/Character/RemoveCharacter"
import viewHill from "../../../Domain/UseCase/Hill/ViewHill";
import removeHill from "../../../Domain/UseCase/Hill/RemoveHill"

export default function UpdateHillModel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hillValues, setHillValues] = useState({
    name: "",
    description: "",
    image: "",
  });

  const [originalCharacters, setOriginalCharacters] = useState([]);
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
    const hill = await changeHill(id, hillValues);
    for (let index in originalCharacters) {
        let remove = true
        for (let character of characters) {
            if (JSON.stringify(originalCharacters[index]) === JSON.stringify(character)) {
                console.log("KEEP", originalCharacters[index])
                remove = false;
                break;
            }
        }
        if (remove) {
            console.log("REMOVE", originalCharacters[index])
            await removeCharacter(originalCharacters[index].id)
        }
    }
    for (let character of characters) {
        if (character.id !== undefined) continue;
        await newCharacter(character, id)
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

  const deleteHill = async () => {
    await removeHill(id)
    navigate(`/`, { replace: true });
  }

  const handleFetch = async () => {
    const {name, description, image, characters} = await viewHill(id)
    setHillValues({name, description, image})
    setCharacters(characters)
    setOriginalCharacters(characters)
  }

  useEffect(() => {
    handleFetch()
  }, [])

  return {
    ...hillValues,
    characterValue,
    saveHill,
    onHillChange,
    addCharacter,
    deleteCharacter,
    onCharacterChange,
    characters,
    deleteHill
  };
}
