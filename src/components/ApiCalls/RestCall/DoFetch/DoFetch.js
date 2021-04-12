export const DoFetch = async (url, endPoint, options) => {
  const response = await fetch(`${url}${endPoint}`, options);

  if (response.ok) {
    if (response.status === 204) {
      //no content
      return;
    } else if (response.status === 304) {
      console.warning(`${response.status} ${response.statusText} ${endPoint}`);
      return response.json();
    } else {
      return response.json();
    }
  } else {
    throw `${response.status} ${response.statusText} for ${url}${endPoint}`;
  }
};
