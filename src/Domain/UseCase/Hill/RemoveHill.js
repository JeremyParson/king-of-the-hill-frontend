import { deleteHill } from "../../../Data/DataSource/HillDataStore";

export default async function removeHill (id) {
    await deleteHill(id)
}