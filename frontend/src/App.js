import './App.css';
import { useEffect, useState } from 'react';
import TableComponent from './components/TableComponent';


function App() {
  const [glucoseData, setGlucoseData] = useState([])

  useEffect(() => {
    fetch(`/api/v1/level`).then(res => res.json()).then(data => {
      setGlucoseData(data)
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

  console.log(glucoseData.length)

  return (
    <div>
      <button onClick={() => fetchData()}>Click</button>
      <TableComponent data={glucoseData} />
      {/* <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Timestamp</th>
            <th>Measure Type</th>
            <th>Glucose Level</th>
          </tr>
        </thead>
        <tbody>
          {glucoseData.map((value, i) => {
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
      </table> */}
    </div>
  );
}

export default App;
