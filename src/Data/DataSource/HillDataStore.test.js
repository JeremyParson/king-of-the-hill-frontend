import {
  indexHills,
  createHill,
  detailHill,
  updateHill,
  deleteHill,
} from "./HillDataStore";
import { authenticateUser, createUser, logoutUser } from "./UserDataStore";
import { LocalStorageMock } from "./MockLocalStorage";

describe("Hill data store.", () => {
  let user;
  const EMAIL = "jimmy@gmail.com";
  const USERNAME = "FooBar";
  const PASSWORD = "HelloWorld";

  const EMAIL2 = "dan@yahoo.com";
  const USERNAME2 = "Jeff345";
  const PASSWORD2 = "ILoveBacon";

  beforeAll(async () => {
    user = await createUser(EMAIL, USERNAME, PASSWORD);
    Object.defineProperty(window, "localStorage", {
      value: new LocalStorageMock(),
    });
  });

  afterEach(() => {
    logoutUser();
  });

  afterAll(async () => {
    if (user) {
      await fetch(`http://localhost:5000/users/${user.id}`, {
        method: "DELETE",
      });
    }
  });

  it("Gets an index of hills.", async () => {
    const hills = await indexHills();
    expect(hills).toBeTruthy();
  });

  it("Creates a new hill.", async () => {
    await authenticateUser(EMAIL, PASSWORD);
    const hill = await createHill("Test Hill", "A Test Hill", "");
    expect(hill).toBeTruthy();
    await deleteHill(hill.id);
  });

  it("Gets hill details.", async () => {
    await authenticateUser(EMAIL, PASSWORD);
    const hill = await createHill("Test Hill", "A Test Hill", "");
    const hillDetails = await detailHill(hill.id);
    expect(hillDetails?.characters).toBeTruthy();
    await deleteHill(hill.id)
  });

  it("Updates a hill.", async () => {
    await authenticateUser(EMAIL, PASSWORD);
    const hill = await createHill("Test Hill", "A Test Hill", "");
    const updated_hill = await updateHill(hill.id, {
      name: "New name",
    });
    expect(updated_hill.name).toEqual("New name");
    await deleteHill(hill.id);
  });

  it("Deletes a hill.", async () => {
    await authenticateUser(EMAIL, PASSWORD);
    const hill = await createHill("Test Hill", "A Test Hill", "");
    let status = await deleteHill(hill.id);
    expect(status).toBeTruthy();
  });

  it("Does not create a hill if the user is logged out", async () => {
    const hill = await createHill("Test Hill", "A Test Hill", "");
    expect(hill).toBeFalsy();
  });

  it("Does not update a hill if it does not belong to the user", async () => {
    await authenticateUser(EMAIL, PASSWORD);
    const hill = await createHill("Test Hill", "A Test Hill", "");
    logoutUser();
    const updated_hill = await updateHill(hill.id, {
      name: "New name",
    });
    expect(updated_hill).toBeFalsy();
    await authenticateUser(EMAIL, PASSWORD);
    await deleteHill(hill.id);
  });

  it("Does not delete a hill if the user is logged out", async () => {
    await authenticateUser(EMAIL, PASSWORD);
    const hill = await createHill("Test Hill", "A Test Hill", "");
    logoutUser();
    let status = await deleteHill(hill.id);
    expect(status).toBeFalsy();
    await authenticateUser(EMAIL, PASSWORD);
    await deleteHill(hill.id);
  });

  it("Only allows hill to be updated by the original creator", async () => {
    var unauthUser = await createUser(EMAIL2, USERNAME2, PASSWORD2);
    await authenticateUser(EMAIL, PASSWORD);
    const hill = await createHill("Test Hill", "A Test Hill", "");
    logoutUser();
    await authenticateUser(EMAIL2, PASSWORD2);
    const updated_hill = await updateHill(hill.id, {
      name: "Unauthorized Change",
    });
    expect(updated_hill).toBeFalsy();
    await authenticateUser(EMAIL, PASSWORD);
    await deleteHill(hill.id);
    await fetch(`http://localhost:5000/users/${unauthUser.id}`, {
        method: "DELETE",
      });
  });

  it("Only allows hill to be deleted by the original creator", async () => {
    var unauthUser = await createUser(EMAIL2, USERNAME2, PASSWORD2);
    await authenticateUser(EMAIL, PASSWORD);
    const hill = await createHill("Test Hill", "A Test Hill", "");
    logoutUser();
    await authenticateUser(EMAIL2, PASSWORD2);
    const status = await deleteHill(hill.id);
    expect(status).toBeFalsy();
    await authenticateUser(EMAIL, PASSWORD);
    await deleteHill(hill.id);
    await fetch(`http://localhost:5000/users/${unauthUser.id}`, {
        method: "DELETE",
      });
  });
});
