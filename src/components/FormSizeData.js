import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  form: {
    paddingLeft: theme.spacing(1),
  },
}));

const FormSizeData = ({ dataSize, setDataSize }) => {
  const classes = useStyles();

  return (
    <FormControl component="fieldset" className={classes.form}>
      <FormLabel component="legend">Get Data</FormLabel>
      <RadioGroup
        row
        name="getData"
        value={dataSize}
        onChange={e => setDataSize(e.target.value)}
      >
        <FormControlLabel
          value="small"
          control={<Radio color="primary" />}
          label="Small"
        />
        <FormControlLabel
          value="large"
          control={<Radio color="primary" />}
          label="Large"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default FormSizeData;
