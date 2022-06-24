import {createUser} from '../../../Data/DataSource/UserDataStore'
export default async function registerUser (info) {
    return await createUser(info.email, info.username, info.password);
}