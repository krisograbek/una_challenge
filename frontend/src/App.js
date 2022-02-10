import './App.css';
import { useEffect, useState } from 'react';


function App() {
  const [currentValue, setCurrentValue] = useState([])

  useEffect(() => {
    fetch(`/api/v1/level`).then(res => res.json()).then(data => {
      setCurrentValue(data)
    })
  }, [])

  const fetchData = () => {
    fetch(`/api/v1/level/reset_db/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {}
    })
      .catch(error => console.log(error))
  }

  console.log(currentValue.length)

  return (
    <div>
      <button onClick={() => fetchData()}>Click</button>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Timestamp</th>
            <th>Measure Type</th>
            <th>Glucose Level</th>
          </tr>
        </thead>
        <tbody>
          {currentValue.map((value, i) => {
            return (
              <tr key={i}>
                <td>
                  {value.user}
                </td>
                <td>
                  {value.timestamp}
                </td>
                <td>
                  {value.measure_type}
                </td>
                <td>
                  {value.glucose_level}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <button onClick={() => fetchData()}>Click</button>
    </div>
  );
}

export default App;
