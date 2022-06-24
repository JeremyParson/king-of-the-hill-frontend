import { createUser, deleteUser, authenticateUser, logoutUser, getUserInfo } from "./UserDataStore";
import { LocalStorageMock } from "./MockLocalStorage";

describe("Server data store.", () => {

  let user;
  const EMAIL = "johndoe@gmail.com"
  const USERNAME = "FooBar"
  const PASSWORD = 'HelloWorld'

  beforeAll(async () => {
    user = await createUser(EMAIL, USERNAME, PASSWORD);
    Object.defineProperty(window, "localStorage", {
      value: new LocalStorageMock(),
    });
  });

  afterAll(async () => {
    if (user) {
      await fetch(`http://localhost:5000/users/${user.id}`, {
        method: "DELETE",
      });
    }
  })

  it("Creates a new user", async () => {
    expect(user).toBeTruthy();
  });

  it("Authenticates the user.", async () => {
    await authenticateUser(EMAIL, PASSWORD)
    let token = localStorage.getItem("token")
    expect(token).toBeTruthy()
  });

  it("Gets the users info", async () => {
    await authenticateUser(EMAIL, PASSWORD)
    const userInfo = await getUserInfo();
    expect(userInfo).toEqual(user)
  })

  it("Logs the user out.", () => {
    logoutUser()
    let token = localStorage.getItem("token")
    expect(token).toBeFalsy()
  });
});
