import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setResponse(null);

    try {
      const parsedData = JSON.parse(input);

      // Check if parsed data is an array
      if (!Array.isArray(parsedData.data)) {
        setError('Invalid JSON input: data should be an array.');
        return;
      }

      const res = await axios.post('https://rahul-m-bajaj-back.vercel.app/bfhl', {
        data: parsedData.data,
      });

      setResponse(res.data);
    } catch (err) {
      setError('Invalid JSON input.');
    }
  };

  const handleFilterChange = (event) => {
    const { value, checked } = event.target;
    setFilter((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const renderResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_alphabet } = response;
    const filteredData = {
      numbers: filter.includes('Numbers') ? numbers : [],
      alphabets: filter.includes('Alphabets') ? alphabets : [],
      highest_alphabet: filter.includes('Highest alphabet') ? highest_alphabet : [],
    };

    return (
      <div>
        {filter.includes('Numbers') && (
          <div>
            <h2>Numbers</h2>
            <pre>{JSON.stringify(filteredData.numbers, null, 2)}</pre>
          </div>
        )}
        {filter.includes('Alphabets') && (
          <div>
            <h2>Alphabets</h2>
            <pre>{JSON.stringify(filteredData.alphabets, null, 2)}</pre>
          </div>
        )}
        {filter.includes('Highest alphabet') && (
          <div>
            <h2>Highest Alphabet</h2>
            <pre>{JSON.stringify(filteredData.highest_alphabet, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Roll Number: ABCD123</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="10"
          cols="50"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON data here, e.g., { "data": ["2", "4", "5", "92"] }'
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {error && <div className="error">{error}</div>}
      {response && (
        <div>
          <h2>Filter Response:</h2>
          <div>
            <label>
              <input
                type="checkbox"
                value="Numbers"
                onChange={handleFilterChange}
              />
              Numbers
            </label>
            <label>
              <input
                type="checkbox"
                value="Alphabets"
                onChange={handleFilterChange}
              />
              Alphabets
            </label>
            <label>
              <input
                type="checkbox"
                value="Highest alphabet"
                onChange={handleFilterChange}
              />
              Highest alphabet
            </label>
          </div>
          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
