import { updateCharacter } from "../../../Data/DataSource/CharacterDataStore";

export default async function changeCharacter (id, changes) {
    await updateCharacter(id, changes)
}