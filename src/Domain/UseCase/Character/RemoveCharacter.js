import { deleteCharacter } from "../../../Data/DataSource/CharacterDataStore";

export default async function removeFunction (id) {
    await deleteCharacter(id)
}