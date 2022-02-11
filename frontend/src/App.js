import './App.css';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import TableComponent from './components/TableComponent';
import FilterPanel from './components/FilterPanel';
import InfoPanel from './components/InfoPanel';


function App() {
  const [glucoseData, setGlucoseData] = useState([]);
  const [paginatorData, setPaginatorData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);

  const [user, setUser] = useState('None');
  const [availableUsers, setAvailableUsers] = useState([]);
  const [orderBy, setOrderBy] = useState("");
  const [isAscending, setIsAscending] = useState(true);


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
  }, [page, orderBy, isAscending])

  const fetchData = () => {
    const body = {
      username: user,
      pageNumber: page,
      rowsPerPage: rowsPerPage,
      orderBy: orderBy,
      isAscending: isAscending
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
      rowsPerPage: rowsPerPage,
      orderBy: orderBy,
      isAscending: isAscending
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

  // update Sorting
  const handleSorting = (sortingElem) => {
    if (orderBy === sortingElem) {
      setIsAscending(!isAscending)
    }
    else {
      setIsAscending(true);
      setOrderBy(sortingElem);
    }
  };

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
    <Container maxWidth='md'>
      <Grid container
        sx={{
          pt: 4
        }}
        spacing={4}
        direction="column"
        alignContent="center"
        justifyContent="center"
      >

        <Grid item>
          <InfoPanel fillDB={fillDB} />
        </Grid>

        <Grid item>
          <FilterPanel
            handleFilter={handleFilter}
            user={user}
            handleChange={handleUserChange}
            availableUsers={availableUsers}
          />
        </Grid>

        {user != "None" && glucoseData.length > 0 &&
          <Grid item>
            <TableComponent
              data={glucoseData}
              paginatorData={paginatorData}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              page={page}
              rowsPerPage={rowsPerPage}
              handleSorting={handleSorting}
            />
          </Grid>
        }

      </Grid>
    </Container>
  );
}

export default App;
