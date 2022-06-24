export async function createUser(email, username, password) {
  const response = await fetch("http://localhost:5000/users", {
    method: "POST",
    body: JSON.stringify({
      email,
      username,
      password,
    }),
  });
  const json = await response.json();
  return json;
}

export async function authenticateUser(email, password) {
  const response = await fetch("http://localhost:5000/auth", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const text = await response.text();
  localStorage.setItem("token", text);
}

export async function getUserInfo() {
  const TOKEN = localStorage.getItem("token");
  if (!TOKEN) return;
  const response = await fetch("http://localhost:5000/auth/profile", {
    headers: new Headers({
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/x-www-form-urlencoded",
    }),
  });
  const json = await response.json();
  return json;
}

export function logoutUser() {
  localStorage.removeItem("token");
}
