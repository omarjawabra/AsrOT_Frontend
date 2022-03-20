# AsrOT Frontend

## Development Setup

### Preparation

Create a file called `constants.js` inside the `src` folder. This file is gitignored and should containthe following local settings:
- SERVER_URL: The URL of the backend server. This is used if MOCK_BACKEND is false.
- MOCK_BACKEND: If true then api calls return dummy data and don't communicate with any backend server.

Example `constants.js`:
```javascript
const SERVER_URL = "http://127.0.0.1:8000";
const MOCK_BACKEND = true;

export { SERVER_URL, MOCK_BACKEND };
```

### Commands
- `npm install`: install dependencies
- `npm run start`: start local development server
- `npm run build`: build