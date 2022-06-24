export async function indexCharacters() {
    const response = await fetch("http://localhost:5000/characters");
    if (response.status !== 200) return;
    const json = await response.json();
    return json;
  }
  
  export async function createCharacter(name, description, image, hill_id) {
    const TOKEN = localStorage.getItem("token");
    const response = await fetch(`http://localhost:5000/characters/${hill_id}`, {
      method: "POST",
      body: JSON.stringify({
        name,
        description,
        image
      }),
      headers: new Headers({
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    });
    if (response.status !== 200) return;
    const json = await response.json();
    return json;
  }
  
  export async function updateCharacter(id, changes) {
    const TOKEN = localStorage.getItem("token");
    const response = await fetch(`http://localhost:5000/characters/${id}`, {
      method: "PATCH",
      body: JSON.stringify(changes),
      headers: new Headers({
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    });
    if (response.status !== 200) return;
    const json = await response.json();
    return json;
  }
  
  export async function deleteCharacter(id) {
    const TOKEN = localStorage.getItem("token");
    const response = await fetch(`http://localhost:5000/characters/${id}`, {
      method: "DELETE",
      headers: new Headers({
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    });
    return response.status == 200;
  }