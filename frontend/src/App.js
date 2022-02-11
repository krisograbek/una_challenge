import './App.css';
import { useEffect, useState } from 'react';
import TableComponent from './components/TableComponent';
import FilterPanel from './components/FilterPanel';


function App() {
  const [glucoseData, setGlucoseData] = useState([]);
  const [paginatorData, setPaginatorData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);

  const [user, setUser] = useState('None');
  const [availableUsers, setAvailableUsers] = useState([]);


  // initial fetch on page load
  useEffect(() => {
    console.log("start")
    fetch(`/api/v1/level?user=None`).then(res => res.json()).then(data => {
      // get glucose data
      setGlucoseData(data.data);
      // set available users. Add user None
      setAvailableUsers(["None"].concat(data.availableUsers));
    })
  }, [])

  // fill DB
  const fillDB = () => {
    fetch(`/api/v1/level/reset_db/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {}
    })
      .catch(error => console.log(error))
  }

  // fetch Data on page change
  useEffect(() => {
    fetchData()
  }, [page])

  const fetchData = () => {
    const body = {
      username: user,
      pageNumber: page,
      rowsPerPage: rowsPerPage
    };
    fetch(`/api/v1/level?user=${user}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json()).then(data => {
        setGlucoseData(data.data)
        setPaginatorData(data.paginator)
      })
      .catch(error => console.log(error))
  }


  const updateData = (user) => {
    const body = {
      username: user,
      pageNumber: page,
      rowsPerPage: rowsPerPage
    };
    fetch(`/api/v1/level?user=${user}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json()).then(data => {
        setGlucoseData(data.data)
        setPaginatorData(data.paginator)
      })
      .catch(error => console.log(error))
  }

  // update current page
  const handleChangePage = (event, newPage) => {
    console.log(newPage)
    setPage(newPage);
  };

  // update rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // update dropdown for users
  const handleUserChange = (event) => {
    setUser(event.target.value);
  };

  // update filter on user change
  const handleFilter = (user) => {
    updateData(user);
  }

  return (
    <div>
      <button onClick={() => fillDB()}>Fill Database</button>
      {/* <button onClick={() => fetchOther()}>Pass pagination info</button> */}

      <FilterPanel
        handleFilter={handleFilter}
        user={user}
        handleChange={handleUserChange}
        availableUsers={availableUsers}
      />

      <TableComponent
        data={glucoseData}
        paginatorData={paginatorData}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}

      />
    </div>
  );
}

export default App;
