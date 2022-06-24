import {getUserInfo} from '../../../Data/DataSource/UserDataStore'
export default async function getProfile () {
    return await getUserInfo()
}