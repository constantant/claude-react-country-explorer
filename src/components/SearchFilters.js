import { TextField, MenuItem, Box } from '@mui/material';
import { useCountryContext } from '../context/CountryContext';

const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

const SearchFilters = () => {
  const { searchTerm, setSearchTerm, selectedRegion, setSelectedRegion } = useCountryContext();

  return (
    <Box sx={{ p: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <TextField
        label="Search countries"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ minWidth: 250 }}
      />
      <TextField
        select
        label="Filter by Region"
        value={selectedRegion}
        onChange={(e) => setSelectedRegion(e.target.value)}
        sx={{ minWidth: 200 }}
      >
        <MenuItem value="">All Regions</MenuItem>
        {regions.map((region) => (
          <MenuItem key={region} value={region}>
            {region}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default SearchFilters;
