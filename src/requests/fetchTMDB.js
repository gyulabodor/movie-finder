import { tmdb_url } from "../configuration/env";


export const fetchTMDBSearchMovie = async (title)  => {

    const query = `
        query SearchMovies {
            searchMovies(query: "${title}") {
                id
                name
                overview
                score
                releaseDate
                img: poster {
                    url: custom(size: "w185_and_h278_bestv2")
                }
            }
        }`;
   const response = await fetch(tmdb_url,  {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({query: query}),
    })

    if (!response.ok) {
		throw new Error(`HTTP error status: ${response.status}`);
	}

    const data = await response.json();
    return data;
}


export const fetchTMDBDiscoverMovies = async (actorID) => {
    const query = `
        query DiscoverMovies {
            discoverMovies(filter: { withCast: { include: [${actorID}] } }) {
                id
                name
                releaseDate
                score
                img: poster {
                    url: custom(size: "w185_and_h278_bestv2")
                    }
                }
        }`;

    const response = await fetch(tmdb_url,  {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({query: query}),
    })

    if (!response.ok) {
		throw new Error(`HTTP error status: ${response.status}`);
	}

    const data = await response.json();
    return data;
}


