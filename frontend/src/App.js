import './App.css';
import { useEffect, useState } from 'react';
import TableComponent from './components/TableComponent';
import FilterPanel from './components/FilterPanel';


function App() {
  const [glucoseData, setGlucoseData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetch(`/api/v1/level?user=None`).then(res => res.json()).then(data => {
      setGlucoseData(data)
      // console.log(data.data)
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


  const updateData = (user) => {
    fetch(`/api/v1/level?user=${user}`).then(res => res.json()).then(data => {
      setGlucoseData(data)
      // console.log(data.data)
    })
  }

  const handleFilter = (user) => {
    updateData(user);
  }

  const fetchOther = () => {
    const body = {
      perPage: 20,
      pages: 5
    };
    fetch(`/api/v1/level/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .catch(error => console.log(error))
  }
  console.log(glucoseData.length)

  return (
    <div>
      <button onClick={() => fetchData()}>Fill Database</button>
      <button onClick={() => fetchOther()}>Pass pagination info</button>

      <FilterPanel handleFilter={handleFilter} />

      <TableComponent data={glucoseData} />
    </div>
  );
}

export default App;
