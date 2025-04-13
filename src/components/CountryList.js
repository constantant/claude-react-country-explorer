import { Grid, Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCountryContext } from '../context/CountryContext';

const CountryList = () => {
  const { countries, loading, error } = useCountryContext();
  const navigate = useNavigate();

  if (loading) return <Typography variant="h5" sx={{ textAlign: 'center', mt: 4 }}>Loading countries...</Typography>;
  if (error) return <Typography variant="h5" sx={{ textAlign: 'center', mt: 4, color: 'error.main' }}>{error}</Typography>;
  if (countries.length === 0) return <Typography variant="h5" sx={{ textAlign: 'center', mt: 4 }}>No countries found</Typography>;

  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      {countries.map((country) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={country.cca3}>
          <Card sx={{ height: '100%' }}>
            <CardActionArea onClick={() => navigate(`/country/${country.cca3}`)}>
              <CardMedia
                component="img"
                height="160"
                image={country.flags.png}
                alt={country.flags.alt || `${country.name.common} flag`}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div" noWrap>
                  {country.name.common}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Population: {country.population.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Region: {country.region}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Capital: {country.capital?.[0] || 'N/A'}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CountryList;
