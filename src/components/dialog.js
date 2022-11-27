import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import CustomRadio from './CustomRadio';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';

class Row {
  constructor(title, desc, deadline, priority, isChecked, updateVisible) {
    this.title = title;
    this.description = desc;
    this.deadline = deadline;
    this.priority = priority;
    this.isChecked = isChecked;
    this.updateVisible = updateVisible;
  }
}

export default function DialogBox(props) {
  const [dateVal, setDateVal] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [priority, setPriority] = useState();
  const [isChecked, setIsChecked] = useState();
  const [dialogName, setDialogName] = useState();
  const [titleVisible, setTitleVisible] = useState('visible');

  const [descriptionText, setDescriptionText] = useState();
  const [titleText, setTitleText] = useState();

  useEffect(() => {
    let init = {};
    console.log(props.focusKey);
    if (props.focusKey === -1) {
      init = new Row('', '', '', '', false, true);
      setTitleVisible('visible');
      setDialogName(
        <Typography variant="h4">
          <AddCircleIcon />
          Add Task
        </Typography>
      );
    } else if (props.focusKey === undefined) {
      console.log('Focus key is null!');
    } else {
      init = props.rows[props.focusKey];
      init.deadline = dayjs(init.deadline).format('MM/DD/YYYY');
      setTitleVisible('hidden');
      setDialogName(
        <Typography variant="h4">
          <EditIcon />
          Edit Task
        </Typography>
      );
    }
    console.log(init);
    setDateVal(init.deadline);
    setTitle(init.title);
    setDescription(init.description);
    setPriority(init.priority);
    setIsChecked(init.isChecked);
  }, [props]);

  function handleSubmit() {
    let descriptionValid = false;
    let titleValid = false;
    const elem = document.getElementById('description');

    if (description === '') {
      setDescriptionText('empty field');
    } else {
      setDescriptionText(null);
      descriptionValid = true;
    }

    if (title === '') {
      setTitleText('empty field');
    } else {
      setTitleText(null);
      titleValid = true;
    }

    if (descriptionValid && titleValid) {
      const nrow = new Row(
        title,
        description,
        dateVal.toString(),
        priority,
        false
      );
      let outRows = [];

      if (props.focusKey === -1) {
        // if the dialog box was invoked by "Add".
        outRows = [...props.rows, nrow];
      } else {
        outRows = [...props.rows];
        outRows[props.focusKey] = nrow;
      }
      props.setRows(outRows);
      console.log(outRows);
      props.cancel();
    }
  }

  return (
    <Dialog open={props.open}>
      <DialogTitle
        align="center"
        style={{ backgroundColor: '#3f50b5', color: 'white', font: 'inherit' }}
      >
        {dialogName}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="email"
            fullWidth
            variant="outlined"
            error={description === ''}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            sx={{ visibility: titleVisible }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="email"
            error={description === ''}
            fullWidth
            variant="outlined"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              renderInput={(fields) => <TextField {...fields} />}
              label="Deadline"
              value={dateVal}
              onChange={(e) => {
                setDateVal(dayjs(e).format('MM/DD/YYYY'));
              }}
            />
          </LocalizationProvider>
          <CustomRadio value={priority} setValue={setPriority}></CustomRadio>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={handleSubmit}
        >
          Add
        </Button>
        <Button
          variant="contained"
          color="error"
          startIcon={<DoNotDisturbAltIcon />}
          onClick={props.cancel}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
