import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, IconButton, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  iconButton: {
    padding: theme.spacing(1),
  },
}));

const FormSearch = ({ setSearchWord }) => {
  const classes = useStyles();

  const [word, setWord] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setSearchWord(word);
    setWord('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <TextField
            label="Search Word"
            variant="outlined"
            size="small"
            fullWidth
            value={word}
            onChange={e => setWord(e.target.value)}
          />
        </Grid>
        <Grid item>
          <IconButton
            type="submit"
            size="small"
            color="primary"
            className={classes.iconButton}
          >
            <SearchIcon />
          </IconButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default FormSearch;
