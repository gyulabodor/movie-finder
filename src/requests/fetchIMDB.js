import { imdb_endpoint, rapidapi_host, rapidapi_key } from "../configuration/env";

export const fetchIMDB = async (title) => {

    const url = `${imdb_endpoint}=${title.replaceAll(' ', '%')}`;
    console.log(url)
    const response = await fetch(url,  {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': rapidapi_key,
            'X-RapidAPI-Host': rapidapi_host
        },
    })

    if (!response.ok) {
		throw new Error(`HTTP error status: ${response.status}`);
	}

    const data = await response.json();
    return data;
} 