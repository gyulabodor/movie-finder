import { wikipedia_url } from "../configuration/env";

export const fetchWikipedia = async (name) => {
  const params = new URLSearchParams({
    origin: "*",
    format: "json",
    action: "query",
    prop: "extracts",
    exchars: "350",
    titles: name,
    exintro: true,
    explaintext: true,
    redirects: true,
  });

  const response = await fetch(wikipedia_url + params.toString());

  if (!response.ok) {
    throw new Error(`HTTP error status: ${response.status}`);
  }

  const data = await response.json();
  return data.query.pages;
};
