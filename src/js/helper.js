// GET data from API
export const AJAX = async function (url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} ${response.status}`);

    return data;
  } catch (err) {
    throw err;
  }
};
