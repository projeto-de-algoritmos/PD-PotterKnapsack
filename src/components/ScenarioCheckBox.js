import * as React from 'react';
import { COLORS } from "../assets/consts/colors";
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function ScenarioCheckbox(props) {
  const [checked, setChecked] = React.useState([false, false, false, false]);

  React.useEffect(() => {
    const callbackIndicesArray = checked.flatMap((bool, index) => bool ? index : [])
    props.callback(callbackIndicesArray)
  }, [checked])

  const handleDragoesChange = (event) => {
    setChecked([event.target.checked, checked[1], checked[2], checked[3]]);
  };

  const handleZeladorFilchChange = (event) => {
    setChecked([checked[0], event.target.checked, checked[2], checked[3]]);
  };

  const handleMinisterioDaMagiaChange = (event) => {
    setChecked([checked[0], checked[1], event.target.checked, checked[3]]);
  };

  const handleComensaisDaMorte = (event) => {
    setChecked([checked[0], checked[1], checked[2], event.target.checked]);
  };

  return (
    <Box sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: COLORS.defaultColor,
      borderRadius: "10%",
      marginLeft: "10%"
    }}>
      <FormControl
        component="fieldset"
        sx={{ m: 2, alignItems: "center", textAlign: "center" }}
        variant="standard"
      >
        <FormLabel component="legend" sx={{ maxWidth: "95%", height: "auto", alignSelf: "center" }}>Selecione o cenário do jogo</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={checked[0]} onChange={handleDragoesChange} name="Dragões" />
            }
            label="Dragões"
          />
          <FormControlLabel
            control={
              <Checkbox checked={checked[1]} onChange={handleZeladorFilchChange} name="Zelador Filch" />
            }
            label="Zelador Filch"
          />
          <FormControlLabel
            control={
              <Checkbox checked={checked[2]} onChange={handleMinisterioDaMagiaChange} name="Ministério da Magia" />
            }
            label="Ministério da Magia"
          />
          <FormControlLabel
            control={
              <Checkbox checked={checked[3]} onChange={handleComensaisDaMorte} name="Comensais da Morte" />
            }
            label="Comensais da Morte"
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
}