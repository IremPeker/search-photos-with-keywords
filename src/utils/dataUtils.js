export const fetchData = async (page, perPage, value, setUrlError) => {
  console.log("I WILL START FETCHING THE DATA VALUE IS", value);

  const accessKey = `${process.env.REACT_APP_API_KEY}`;
  const url = value
    ? `https://api.unsplash.com/search/photos?client_id=${accessKey}&page=${page}&per_page=${perPage}&query=${value}`
    : `https://api.unsplash.com/photos/random?count=20&client_id=${accessKey}&page=${page}&per_page=${perPage}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    const photos = data.results || data;
    console.log("data is: ", photos);

    return photos;
  } catch (error) {
    console.error("Error during fetch:", error);
    setUrlError(true);
  }
};
