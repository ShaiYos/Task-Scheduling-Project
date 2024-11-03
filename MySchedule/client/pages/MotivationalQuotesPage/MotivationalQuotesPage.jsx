import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { useThemeContext } from '../../src/components/ThemeContext';

// import './MotivationQuotesPage.css'; // Import CSS for styling

const MotivationQuotesPage = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { mode } = useThemeContext();

  const fetchQuote = async () => {
    setLoading(true); // Set loading state before fetching
    setError(''); // Clear previous error

    try {
      const response = await fetch('https://api.api-ninjas.com/v1/quotes', {
        method: 'GET',
        headers: {
          'X-Api-Key': import.meta.env.VITE_X_API_KEY,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch the quote');
      }

      const data = await response.json();
      setQuote(data[0].quote);
      setAuthor(data[0].author);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching quote:', error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <Box className={`motivation-page-container ${mode}`} sx={{ padding: 10, textAlign: 'center' }}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error" aria-live="assertive">
          Error: {error}
        </Typography>
      ) : (
        <Box>
          <Typography variant="h4" gutterBottom>
            Motivational Quote
          </Typography>
          <Typography variant="h6" fontStyle="italic">
            "{quote}"
          </Typography>
          <Typography variant="subtitle1" sx={{ marginTop: 1 }}>
            - {author}
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={fetchQuote}
            sx={{ marginTop: 2 }}
          >
            Get Another Quote
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MotivationQuotesPage;
