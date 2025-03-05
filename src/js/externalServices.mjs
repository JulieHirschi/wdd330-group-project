const baseURL = import.meta.env.VITE_SERVER_URL;

export async function loginRequest(creds) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(creds),
  };
  return await fetch(baseURL + 'login', options).then(convertToJson);
}

async function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw { name: 'servicesError', message: jsonResponse };
  }
}

export function getProductsByCatefory(category = 'tents') {
  return fetch(baseURL + `products/search/${category}`)
    .then(convertToJson)
    .then((data) => data.Result);
}

export async function findProductById(id, category) {
  const products = await getProductsByCatefory(category);
  return products.find((item) => item.Id === id);
}

export async function checkout(payload) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };
  return await fetch(baseURL + 'checkout/', options).then(convertToJson);
}

export async function getOrders(payload) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  return await fetch(baseURL + 'orders/', options).then(convertToJson);
}
