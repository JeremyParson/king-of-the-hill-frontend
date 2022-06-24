import {
    indexCharacters,
    createCharacter,
    updateCharacter,
    deleteCharacter,
  } from "./CharacterDataStore";
import {
    createHill,
    deleteHill
} from "./HillDataStore"
  import { authenticateUser, createUser, logoutUser } from "./UserDataStore";
  import { LocalStorageMock } from "./MockLocalStorage";
  
  describe("character data store.", () => {
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
  
    it("Gets an index of characters.", async () => {
      const character = await indexCharacters();
      expect(character).toBeTruthy();
    });
  
    it("Creates a new character.", async () => {
      await authenticateUser(EMAIL, PASSWORD);
      const hill = await createHill("",  "", "");
      const character = await createCharacter("Test character", "A Test character", "image", hill.id);
      expect(character).toBeTruthy();
      await deleteCharacter(character.id);
      await deleteHill(hill.id);
    });
  
    it("Updates a character.", async () => {
      await authenticateUser(EMAIL, PASSWORD);
      const hill = await createHill("",  "", "")
      const character = await createCharacter("Test character", "A Test character", "image", hill.id);
      const updated_character = await updateCharacter(character.id, {
        name: "New name",
      });
      expect(updated_character.name).toEqual("New name");
      await deleteCharacter(character.id);
      await deleteHill(hill.id)
    });
  
    it("Deletes a character.", async () => {
      await authenticateUser(EMAIL, PASSWORD);
      const hill = await createHill("",  "", "")
      const character = await createCharacter("Test character", "A Test character", "image", hill.id);
      let status = await deleteCharacter(character.id);
      expect(status).toBeTruthy();
      await deleteCharacter(character.id);
      await deleteHill(hill.id)
    });
  
    it("Does not create a character if the user is logged out", async () => {
      const character = await createCharacter("Test character", "A Test character", "image", 0);
      expect(character).toBeFalsy();
    });
  
    it("Does not update a character if it does not belong to the user", async () => {
      await authenticateUser(EMAIL, PASSWORD);
      const hill = await createHill("",  "", "")
      const character = await createCharacter("Test character", "A Test character", "image", hill.id);
      logoutUser();
      const updated_character = await updateCharacter(character.id, {
        name: "New name",
      });
      expect(updated_character).toBeFalsy();
      await authenticateUser(EMAIL, PASSWORD);
      await deleteCharacter(character.id);
      await deleteHill(hill.id)
    });
  
    it("Does not delete a character if the user is logged out", async () => {
      await authenticateUser(EMAIL, PASSWORD);
      const hill = await createHill("",  "", "")
      const character = await createCharacter("Test character", "A Test character", "image", hill.id);
      logoutUser();
      let status = await deleteCharacter(character.id);
      expect(status).toBeFalsy();
      await authenticateUser(EMAIL, PASSWORD);
      await deleteCharacter(character.id);
      await deleteHill(hill.id)
    });
  
    it("Only allows character to be updated by the original creator", async () => {
      var unauthUser = await createUser(EMAIL2, USERNAME2, PASSWORD2);
      await authenticateUser(EMAIL, PASSWORD);
      const hill = await createHill("",  "", "")
      const character = await createCharacter("Test character", "A Test character", "image", hill.id);
      logoutUser();
      await authenticateUser(EMAIL2, PASSWORD2);
      const updated_character = await updateCharacter(character.id, {
        name: "Unauthorized Change",
      });
      expect(updated_character).toBeFalsy();
      await authenticateUser(EMAIL, PASSWORD);
      await deleteCharacter(character.id);
      await deleteHill(hill.id)
      await fetch(`http://localhost:5000/users/${unauthUser.id}`, {
          method: "DELETE",
        });
    });
  
    it("Only allows character to be deleted by the original creator", async () => {
      var unauthUser = await createUser(EMAIL2, USERNAME2, PASSWORD2);
      await authenticateUser(EMAIL, PASSWORD);
      const hill = await createHill("",  "", "")
      const character = await createCharacter("Test character", "A Test character", "image", hill.id);
      logoutUser();
      await authenticateUser(EMAIL2, PASSWORD2);
      const status = await deleteCharacter(character.id);
      expect(status).toBeFalsy();
      await authenticateUser(EMAIL, PASSWORD);
      await deleteCharacter(character.id);
      await deleteHill(hill.id)
      await fetch(`http://localhost:5000/users/${unauthUser.id}`, {
          method: "DELETE",
        });
    });
  });
