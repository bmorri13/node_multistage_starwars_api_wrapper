import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 5002;

// Function to get the URL from SWAPI
async function getSwapiUrl(endpoint, searchTerm) {
  let swapiUrl = `https://swapi.py4e.com/api/${endpoint}/`;
  if (searchTerm) {
    swapiUrl += `?search=${searchTerm}`;
  }

  try {
    const response = await fetch(swapiUrl);
    if (response.ok) {
      return { data: await response.json(), status: 200 };
    } else {
      return { error: "Failed to fetch data from SWAPI", status: response.status };
    }
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch data from SWAPI", status: 500 };
  }
}

// Define routes
app.get('/ships', async (req, res) => {
  const searchTerm = req.query.search;
  const { data, status } = await getSwapiUrl("starships", searchTerm);
  res.status(status).json(data);
});

app.get('/characters', async (req, res) => {
  const searchTerm = req.query.search;
  const { data, status } = await getSwapiUrl("people", searchTerm);
  res.status(status).json(data);
});

app.get('/', (req, res) => {
  res.json({
        "_welcome_note": "Star Wars APi Wrapper from SWAPI. Use the available APIs to access information about Star Wars starships and characters.",
        "available_apis": {
            "/ships": "Access information about Star Wars starships. Use the 'search' query parameter to filter results.",
            "/characters": "Access information about Star Wars characters. Use the 'search' query parameter to filter results.",
            "/": "Home page listing all available APIs.",
        "search_query": "Use the 'search' query parameter to filter results based on the name of the starship or character."
        }
  });
});

app.get('*', (req, res) => {
  res.status(404).json({ message: "Not active API" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
