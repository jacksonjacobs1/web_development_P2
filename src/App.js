import './style.css';
import React, { useState } from 'react';
import Container from '@mui/material/Box';
import ButtonAppBar from './components/appBar';
import MutableTable from './components/mutableTable';

function App() {
  const [rows, setRows] = useState([]);
  const [focusKey, setFocusKey] = React.useState();
  const [open, setOpen] = React.useState(false);

  // need hook to append rows

  return (
    <div className="App">
      <Container id="container">
        <ButtonAppBar
          rows={rows}
          setRows={setRows}
          focusKey={focusKey}
          setFocusKey={setFocusKey}
          open={open}
          setOpen={setOpen}
        ></ButtonAppBar>
        <MutableTable
          rows={rows}
          setRows={setRows}
          focusKey={focusKey}
          setFocusKey={setFocusKey}
          open={open}
          setOpen={setOpen}
        />
      </Container>
    </div>
  );
}

export default App;
