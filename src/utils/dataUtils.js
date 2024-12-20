export const fetchData = async (page, perPage, value, userName) => {
  const accessKey = `${process.env.REACT_APP_API_KEY}`;
  const url = value
    ? `https://api.unsplash.com/search/photos?client_id=${accessKey}&page=${page}&per_page=${perPage}&query=${value}`
    : userName
    ? `https://api.unsplash.com/users/${userName}/photos?client_id=${accessKey}&page=${page}&per_page=${perPage}`
    : `https://api.unsplash.com/photos/random?count=20&client_id=${accessKey}&page=${page}&per_page=${perPage}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    const photos = data.results || data;

    // Include total_pages if available, or infer by checking the length of photos
    const totalPages =
      data.total_pages || (photos.length < perPage ? page : null);
    return { photos, totalPages };
  } catch (error) {
    throw new Error("Network response was not ok", error);
  }
};
