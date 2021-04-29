import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  CssBaseline,
  CircularProgress,
  Paper,
  Typography,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import DataTable from './components/DataTable';
import Details from './components/Details';
import FormAddRow from './components/FormAddRow';
import FormSizeData from './components/FormSizeData';
import FormSearch from './components/FormSearch';
import { DATA_SMALL_SIZE, ROWS_PER_PAGE, SMALL_URL, LARGE_URL } from './config';

const useStyles = makeStyles(theme => ({
  paper: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const App = () => {
  const classes = useStyles();

  const [dataSize, setDataSize] = useState(DATA_SMALL_SIZE);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [detailRow, setDetailRow] = useState(null);

  useEffect(() => {
    const url = dataSize === DATA_SMALL_SIZE ? SMALL_URL : LARGE_URL;
    setLoading(true);

    fetch(`${url}`)
      .then(response => response.json())
      .then(result => {
        setData(result);
        setLoading(false);

        console.log(result);
      })
      .catch(err => {
        setLoading(false);
        setError(err.message);
      });
  }, [dataSize]);

  useEffect(() => {
    setTotalPages(Math.round(data.length / ROWS_PER_PAGE));
  }, [data]);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <Typography variant="h3" align="center" gutterBottom>
          Job Test Task
        </Typography>
        <FormSizeData dataSize={dataSize} setDataSize={setDataSize} />
        {loading ? (
          <div className={classes.center}>
            <CircularProgress />
          </div>
        ) : (
          <>
            <Paper className={classes.paper}>
              <FormAddRow />
            </Paper>
            <Paper className={classes.paper}>
              <FormSearch />
            </Paper>
            <Paper className={classes.paper}>
              <DataTable rows={data} />
            </Paper>
            {detailRow && (
              <Paper className={classes.paper}>
                <Details detailRow={detailRow} />
              </Paper>
            )}
            {totalPages > 0 && (
              <div className={classes.center}>
                <Pagination
                  count={totalPages}
                  variant="outlined"
                  shape="rounded"
                  color="primary"
                />
              </div>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default App;
