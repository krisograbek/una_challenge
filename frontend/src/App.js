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



  useEffect(() => {
    fetch(`/api/v1/level?user=None`).then(res => res.json()).then(data => {
      setGlucoseData(data.data)
    })
  }, [])

  const resetDB = () => {
    fetch(`/api/v1/level/reset_db/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {}
    })
      .catch(error => console.log(error))
  }

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

  const handleUserChange = (event) => {
    setUser(event.target.value);
  };



  const handleChangePage = (event, newPage) => {
    console.log(newPage)
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilter = (user) => {
    updateData(user);
  }

  // const fetchOther = () => {
  //   const body = {
  //     perPage: 20,
  //     pages: 5,
  //     user: "None"
  //   };
  //   fetch(`/api/v1/level`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(body)
  //   })
  //     .catch(error => console.log(error))
  // }
  // console.log(glucoseData.length)

  return (
    <div>
      <button onClick={() => resetDB()}>Fill Database</button>
      {/* <button onClick={() => fetchOther()}>Pass pagination info</button> */}

      <FilterPanel handleFilter={handleFilter} user={user} handleChange={handleUserChange} />

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
