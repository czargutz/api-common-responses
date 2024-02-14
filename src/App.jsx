import { useState } from "react";
import reactLogo from "/react.svg";
import "./App.css";

import request from "./request";

function App() {
  const [urlBase, setUrlBase] = useState(
    "https://jsonplaceholder.typicode.com/todos/1"
  );

  const handleRequest = () => {
    request(urlBase, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then((a) => {
      console.log(a);
    });
  };

  return (
    <>
      <div data-testid="app_test_id">
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>api-common-responses</h1>
      <div className="card">
        <input
          value={urlBase}
          onChange={(event) => setUrlBase(event.target.value)}
        />
        <button data-testid="request_action_test_id" onClick={handleRequest}>
          Request
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
