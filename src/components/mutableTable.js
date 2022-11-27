import React, { useState, useRef } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function MutableTable(props) {
  const handleCheck = (event) => {
    // need to change isChecked to true
    // change actions
    // get row

    const elemId = parseInt(event.target.id);
    const row = props.rows[elemId];
    const rowsCopy = [...props.rows];
    row.isChecked = !row.isChecked;
    row.updateVisible = row.updateVisible === 'hidden' ? 'visible' : 'hidden';
    rowsCopy[elemId] = row;
    props.setRows(rowsCopy);
  };

  const handleUpdate = (event) => {
    props.setFocusKey(parseInt(event.target.id));
    props.setOpen(true);
  };

  const handleDelete = (event) => {
    const rowsCopy = [...props.rows];
    rowsCopy.pop(parseInt(event.target.id));
    console.log(event.target.id);
    props.setRows(rowsCopy);
  };

  const listItems = [];
  for (let i = 0; i < props.rows.length; i++) {
    let rowObj = props.rows[i];
    listItems.push(
      <TableRow className="table-row" key={i}>
        <TableCell align="center">{rowObj.title}</TableCell>
        <TableCell align="center">{rowObj.description}</TableCell>
        <TableCell align="center">{rowObj.deadline}</TableCell>
        <TableCell align="center">{rowObj.priority}</TableCell>
        <TableCell align="center">
          <Checkbox
            id={i.toString()}
            checked={rowObj.isChecked}
            onChange={handleCheck}
          />
        </TableCell>
        <TableCell align="center">
          <Stack>
            <Button
              id={i.toString()}
              onClick={handleUpdate}
              size="small"
              color="primary"
              variant="contained"
              sx={{ visibility: rowObj.updateVisible }}
            >
              Update
            </Button>
            <Button
              id={i.toString()}
              size="small"
              color="error"
              variant="contained"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Stack>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <Table>
      <TableHead>
        <TableCell align="center">Title</TableCell>
        <TableCell align="center">Description</TableCell>
        <TableCell align="center">Deadline</TableCell>
        <TableCell align="center">Priority</TableCell>
        <TableCell align="center">Is Complete</TableCell>
        <TableCell align="center">Action</TableCell>
      </TableHead>
      <TableBody>{listItems}</TableBody>
    </Table>
  );
}
