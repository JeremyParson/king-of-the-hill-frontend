import { createHill } from '../../../Data/DataSource/HillDataStore'

export default async function newHill (value) {
    return await createHill (value.name, value.description, value.image)
}