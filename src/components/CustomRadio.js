import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function CustomRadio(props) {
  const handleChange = (event) => {
    props.setValue(event.target.value);
    console.log(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Priority</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={props.value}
        onChange={handleChange}
      >
        <FormControlLabel value="low" control={<Radio />} label="low" />
        <FormControlLabel value="medium" control={<Radio />} label="medium" />
        <FormControlLabel value="high" control={<Radio />} label="high" />
      </RadioGroup>
    </FormControl>
  );
}
