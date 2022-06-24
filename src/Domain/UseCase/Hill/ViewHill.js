import {detailHill} from "../../../Data/DataSource/HillDataStore"

export default async function viewHill (id) {
    return await detailHill(id)
}