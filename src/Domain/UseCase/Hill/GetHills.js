import { indexHills } from '../../../Data/DataSource/HillDataStore'

export default async function getHills () {
    return await indexHills()
}
