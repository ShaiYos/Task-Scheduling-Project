import React, { useEffect, useState, useRef } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { useThemeContext } from '../../src/components/ThemeContext';

import './MotivationalQuotesPage.css';

const MotivationQuotesPage = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { mode } = useThemeContext();
  const hasFetchedQuote = useRef(false);  // Ref to track if quote has been fetched

  const fetchQuote = async () => {
    setLoading(true);
    setError('');
    setQuote(''); // Clear the previous quote

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
      if (data && data.length > 0) {
        setQuote(data[0].quote);
        setAuthor(data[0].author);
      }
    } catch (error) {
      setError(error.message);
      console.error('Error fetching quote:', error);
    } finally {
      setLoading(false);
    }
  };

  /* Fetch the quote only once on component load */
  useEffect(() => {
    if (!hasFetchedQuote.current) {
      fetchQuote();
      hasFetchedQuote.current = true;
    }
  }, []);

  return (
    <>
      {loading && (
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999
        }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && (
        <Box className={`motivation-page-container ${mode}`} >
          <Typography variant="h4" gutterBottom>
            Motivational Quote
          </Typography>

          {error ? (
            <Typography color="error">Error: {error}</Typography>
          ) : (
            <Box>
              <Typography className='quote-text' variant="h6" fontStyle="italic">
                "{quote}"
              </Typography>
              <Typography className='quote-author' variant="subtitle1" sx={{ marginTop: 1 }}>
                - {author}
              </Typography>
            </Box>
          )}

          <Button
            className='fetch-quote-btn'
            variant="contained"
            color="primary"
            onClick={fetchQuote}
            sx={{ marginTop: 5 }}
          >
            Get Another Quote
          </Button>
        </Box>
      )}
    </>
  );
};

export default MotivationQuotesPage;
