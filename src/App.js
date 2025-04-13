import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, AppBar, Toolbar, Typography, Container, ThemeProvider, createTheme } from '@mui/material';
import { CountryProvider } from './context/CountryContext';
import CountryList from './components/CountryList';
import CountryDetail from './components/CountryDetail';
import SearchFilters from './components/SearchFilters';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196f3',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <CountryProvider>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div">
                Country Explorer
              </Typography>
            </Toolbar>
          </AppBar>
          <Container maxWidth="xl">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <SearchFilters />
                    <CountryList />
                  </>
                }
              />
              <Route path="/country/:id" element={<CountryDetail />} />
            </Routes>
          </Container>
        </CountryProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
