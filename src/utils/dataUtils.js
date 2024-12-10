export const fetchData = async (page, value) => {
  const accessKey = `${process.env.REACT_APP_API_KEY}`;
  const url = `https://api.unsplash.com/search/photos?client_id=${accessKey}&page=${page}&per_page=2&query=${value}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("data is: ", data);

    return data;
  } catch (error) {
    console.error("Error during fetch:", error);
    return null;
  }
};
