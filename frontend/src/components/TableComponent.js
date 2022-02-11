import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function TableComponent(props) {

  const {
    data,
    paginatorData,
    handleChangePage,
    handleChangeRowsPerPage,
    page,
    rowsPerPage
  } = props;


  return (
    <Paper>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="right">User</TableCell>
              <TableCell align="right">Timestamp</TableCell>
              <TableCell align="right">Measure Type</TableCell>
              <TableCell align="right">Glucose Level&nbsp;(mg/dL)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="right">{row.user}</TableCell>
                  <TableCell align="right">{row.timestamp}</TableCell>
                  <TableCell align="right">{row.measure_type}</TableCell>
                  <TableCell align="right">{row.glucose_level}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={paginatorData.count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default TableComponent;