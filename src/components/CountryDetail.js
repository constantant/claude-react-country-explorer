import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CountryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/alpha/${id}`);
        setCountry(response.data[0]);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch country details. Please try again later.');
        setLoading(false);
      }
    };

    fetchCountry();
  }, [id]);

  if (loading) return <Typography variant="h5" sx={{ textAlign: 'center', mt: 4 }}>Loading country details...</Typography>;
  if (error) return <Typography variant="h5" sx={{ textAlign: 'center', mt: 4, color: 'error.main' }}>{error}</Typography>;
  if (!country) return <Typography variant="h5" sx={{ textAlign: 'center', mt: 4 }}>Country not found</Typography>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        variant="contained"
        sx={{ mb: 4 }}
      >
        Back to List
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <Box
              component="img"
              src={country.flags.svg}
              alt={country.flags.alt || `${country.name.common} flag`}
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: 400,
                objectFit: 'cover',
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {country.name.common}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {country.name.official}
          </Typography>

          <List>
            <ListItem>
              <ListItemText
                primary="Capital"
                secondary={country.capital?.[0] || 'N/A'}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Population"
                secondary={country.population.toLocaleString()}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Region"
                secondary={`${country.region} (${country.subregion || 'N/A'})`}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Languages"
                secondary={Object.values(country.languages || {}).join(', ') || 'N/A'}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Currencies"
                secondary={
                  Object.values(country.currencies || {})
                    .map(currency => `${currency.name} (${currency.symbol || 'N/A'})`)
                    .join(', ') || 'N/A'
                }
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CountryDetail;
