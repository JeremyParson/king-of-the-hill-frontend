import {authenticateUser} from '../../../Data/DataSource/UserDataStore'
export default async function loginUser (values) {
    await authenticateUser(values.email, values.password)
}