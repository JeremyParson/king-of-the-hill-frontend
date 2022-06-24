import { createCharacter } from "../../../Data/DataSource/CharacterDataStore";

export default async function newCharacter (values, hill_id) {
  return await createCharacter(values.name, values.description, values.image, hill_id)
}
