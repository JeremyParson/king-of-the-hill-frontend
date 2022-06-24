export async function indexHills() {
  const response = await fetch("http://localhost:5000/hills");
  if (response.status !== 200) return;
  const json = await response.json();
  return json;
}

export async function createHill(name, description, image) {
  const TOKEN = localStorage.getItem("token");
  const response = await fetch("http://localhost:5000/hills/", {
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

export async function detailHill(id) {
  const response = await fetch(`http://localhost:5000/hills/${id}`);
  if (response.status !== 200) return;
  const json = await response.json();
  return json;
}

export async function updateHill(id, changes) {
  const TOKEN = localStorage.getItem("token");
  const response = await fetch(`http://localhost:5000/hills/${id}`, {
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

export async function deleteHill(id) {
  const TOKEN = localStorage.getItem("token");
  const response = await fetch(`http://localhost:5000/hills/${id}`, {
    method: "DELETE",
    headers: new Headers({
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/x-www-form-urlencoded",
    }),
  });
  return response.status == 200;
}