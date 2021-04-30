import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Grid } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useStyles = makeStyles(theme => ({
  form: {
    marginTop: theme.spacing(2),
  },
}));

const FormAddRow = ({ addNewRow }) => {
  const classes = useStyles();

  const [addRow, setAddRow] = useState(false);
  const [visible, setVisible] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (firstName && lastName && email && phone) {
      setVisible(true);
    }
  }, [firstName, lastName, email, phone]);

  const handleSubmit = e => {
    e.preventDefault();
    addNewRow(firstName, lastName, email, phone);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setVisible(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={addRow ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        onClick={() => setAddRow(!addRow)}
      >
        Add New Row
      </Button>
      {addRow && (
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <TextField
                label="First Name"
                variant="outlined"
                size="small"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Last Name"
                variant="outlined"
                size="small"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Email"
                variant="outlined"
                size="small"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Phone"
                variant="outlined"
                size="small"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </Grid>
            {visible && (
              <Grid item>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            )}
          </Grid>
        </form>
      )}
    </>
  );
};

export default FormAddRow;
