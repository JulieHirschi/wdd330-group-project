function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

const baseURL = import.meta.env.VITE_SERVER_URL;

export function getData(category = 'tents') {
  return fetch(baseURL + `products/search/${category}`)
    .then(convertToJson)
    .then((data) => data.Result);
}

export async function findProductById(id, category) {
  const products = await getData(category);
  return products.find((item) => item.Id === id);
}
