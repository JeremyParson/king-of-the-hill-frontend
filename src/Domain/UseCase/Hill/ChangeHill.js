import { updateHill } from "../../../Data/DataSource/HillDataStore";

export default async function changeHill (id, changes) {
    return await updateHill(id, changes);
}