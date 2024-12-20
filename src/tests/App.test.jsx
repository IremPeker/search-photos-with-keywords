import fetchMock from "jest-fetch-mock";
import { mockedData } from "../mocks/mockedData";
import { fetchData } from "../utils/dataUtils";

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("fetchData", () => {
  const page = 1;
  const perPage = 3;
  let value = "";
  let userName = "";
  const accessKey = "mock_access_key";
  const url = `https://api.unsplash.com/photos/random?count=20&client_id=${accessKey}&page=${page}&per_page=${perPage}`;

  test("successful fetch with no search value or user name (random photos)", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockedData), { url });
    const result = await fetchData(page, perPage, value, userName);
    expect(result.photos.photos.length).toEqual(mockedData.photos.length);
  });

  test("successful fetch with search value", async () => {
    value = "woman";
    fetchMock.mockResponseOnce(JSON.stringify(mockedData), { url });
    const result = await fetchData(page, perPage, value, userName);
    const returnedDesc = result.photos.photos[0].alt_description;
    expect(returnedDesc).toContain(value);
  });

  test("successful fetch with username", async () => {
    userName = "xxxxx";
    fetchMock.mockResponseOnce(JSON.stringify(mockedData), { url });
    const result = await fetchData(page, perPage, value, userName);
    const returnedUsername = result.photos.photos[0].user.username;
    expect(returnedUsername).toEqual(userName);
  });

  test("failed fetch with invalid API key", async () => {
    const response = {
      ok: false,
      statusText: "Unauthorized",
    };

    fetch.mockImplementationOnce(() => response);
    await expect(fetchData(page, perPage, value, userName)).rejects.toThrow(
      "Network response was not ok"
    );
  });
});
