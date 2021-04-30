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
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [searchWord, setSearchWord] = useState('');
  const [detailRow, setDetailRow] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const url = dataSize === DATA_SMALL_SIZE ? SMALL_URL : LARGE_URL;
    setLoading(true);
    setSearchWord('');
    setDetailRow(null);

    fetch(`${url}`)
      .then(response => response.json())
      .then(result => {
        setData(
          result.map((item, index) => {
            item.id = index + 1;
            return item;
          })
        );
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setError(err);
      });
  }, [dataSize]);

  useEffect(() => {
    if (searchData.length > 0) {
      setTotalPages(Math.round(searchData.length / ROWS_PER_PAGE));
    } else {
      setTotalPages(Math.round(data.length / ROWS_PER_PAGE));
    }
    setPage(1);
  }, [data, searchData]);

  useEffect(() => {
    if (!searchWord.trim()) {
      setSearchData([]);
      return;
    }
    const newData = data.filter(item => {
      if (
        item.firstName.includes(searchWord) ||
        item.lastName.includes(searchWord) ||
        item.email.includes(searchWord) ||
        item.phone.includes(searchWord)
      ) {
        return true;
      } else {
        return false;
      }
    });
    setSearchData(newData);
  }, [searchWord]);

  const addNewRow = (firstName, lastName, email, phone) => {
    const newItem = {
      id: data.length + 1,
      firstName,
      lastName,
      email,
      phone,
      address: {
        streetAddress: null,
        city: null,
        state: null,
        zip: null,
      },
      description: null,
    };
    setData([...JSON.parse(JSON.stringify(data)), newItem]);
  };

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
              <FormAddRow addNewRow={addNewRow} />
            </Paper>
            <Paper className={classes.paper}>
              <FormSearch setSearchWord={setSearchWord} />
            </Paper>
            <Paper className={classes.paper}>
              <DataTable
                rows={searchData.length > 0 ? searchData : data}
                page={page}
                setDetailRow={setDetailRow}
              />
            </Paper>
            {detailRow && (
              <Paper className={classes.paper}>
                <Details detailRow={detailRow} />
              </Paper>
            )}
            {totalPages > 0 && (
              <div className={classes.center}>
                <Pagination
                  variant="outlined"
                  shape="rounded"
                  color="primary"
                  count={totalPages}
                  page={page}
                  onChange={(e, value) => setPage(value)}
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
