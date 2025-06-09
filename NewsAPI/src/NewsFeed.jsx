import React, { useRef, useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import withLoading from './withLoading';

const API_KEY = import.meta.env.VITE_API_KEY;
const CATEGORIES = ['general', 'technology', 'sports', 'health', 'business'];
const SOURCES = ['techcrunch', 'bbc-news', 'cnn', 'reuters'];
const ENDPOINTS = {
  topHeadlines: 'https://newsapi.org/v2/top-headlines',
  everything: 'https://newsapi.org/v2/everything'
};

function NewsFeed({ loading, setLoading }) {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState('');
  const [endpoint, setEndpoint] = useState('topHeadlines');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [error, setError] = useState(null);
  const [isInCooldown, setIsInCooldown] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const ITEMS_PER_PAGE = 10;
  const MAX_ITEMS = 20;
  const categoryRef = useRef(null);
  const sourceRef = useRef(null);
  const searchTimeoutRef = useRef(null);
  const fetchTimeoutRef = useRef(null);
  const cooldownTimeoutRef = useRef(null);
  const COOLDOWN_PERIOD = 5 * 60 * 1000; // 5 minutes in milliseconds

  const startCooldown = useCallback(() => {
    setIsInCooldown(true);
    if (cooldownTimeoutRef.current) {
      clearTimeout(cooldownTimeoutRef.current);
    }
    cooldownTimeoutRef.current = setTimeout(() => {
      setIsInCooldown(false);
      setError(null);
    }, COOLDOWN_PERIOD);
  }, []);

  const handleRateLimit = useCallback(() => {
    setIsRateLimited(true);
    setError('API rate limit exceeded. Please try again later or upgrade your API plan.');
    setLoading(false);
  }, [setLoading]);

  const fetchNews = useCallback(async (query = '', category = '', source = '') => {
    if (isRateLimited || isInCooldown) {
      return;
    }

    if (!isInitialLoad) {
      setIsTransitioning(true);
      setLoading(true);
    }
    
    setError(null);
    setCurrentPage(1);
    
    try {
      let params = {
        apiKey: API_KEY,
        pageSize: MAX_ITEMS,
      };

      if (endpoint === 'topHeadlines') {
        params = {
          ...params,
          country: 'us',
          category: category || undefined,
          q: query || undefined,
        };
      } else {
        params = {
          ...params,
          q: query || undefined,
          sortBy: 'publishedAt',
          from: dateRange.from || undefined,
          to: dateRange.to || undefined,
        };
      }

      if (source) {
        params.sources = source;
      }

      const { data } = await axios.get(ENDPOINTS[endpoint], { params });
      
      if (data?.articles) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setArticles(data.articles);
        setIsInitialLoad(false);
      } else {
        setArticles([]);
      }
    } catch (e) {
      console.error('Error fetching news:', e);
      setArticles([]);
      
      if (e.response) {
        if (e.response.status === 429) {
          handleRateLimit();
          return;
        }

        switch (e.response.status) {
          case 401:
            setError('API key is invalid or expired. Please check your API key.');
            startCooldown();
            break;
          default:
            setError('Failed to fetch news. Please try again in 5 minutes.');
            startCooldown();
        }
      } else if (e.request) {
        setError('Network error. Please check your internet connection and try again in 5 minutes.');
        startCooldown();
      } else {
        setError('An unexpected error occurred. Please try again in 5 minutes.');
        startCooldown();
      }
    } finally {
      const timeoutId = setTimeout(() => {
        setLoading(false);
        setIsTransitioning(false);
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [
    endpoint, 
    dateRange, 
    API_KEY, 
    isInCooldown, 
    isRateLimited, 
    startCooldown, 
    handleRateLimit, 
    isInitialLoad, 
    setLoading
  ]);

  const debouncedFetch = useCallback((query = '', category = '', source = '') => {
    if (isRateLimited || isInCooldown) {
      return;
    }

    if (fetchTimeoutRef.current) {
      clearTimeout(fetchTimeoutRef.current);
    }

    fetchTimeoutRef.current = setTimeout(() => {
      fetchNews(query, category, source);
    }, 1000);

    return () => {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }
    };
  }, [fetchNews, isInCooldown, isRateLimited]);

  const handleSearch = useCallback((e) => {
    const value = e.target.value;
    setSearch(value);
    debouncedFetch(value, categoryRef.current?.value, sourceRef.current?.value);
  }, [debouncedFetch]);

  const handleCategory = useCallback(() => {
    debouncedFetch(search, categoryRef.current?.value, sourceRef.current?.value);
  }, [search, debouncedFetch]);

  const handleSource = useCallback(() => {
    debouncedFetch(search, categoryRef.current?.value, sourceRef.current?.value);
  }, [search, debouncedFetch]);

  const handleEndpointChange = useCallback((e) => {
    setEndpoint(e.target.value);
  }, []);

  const handleDateChange = useCallback((e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleReset = useCallback(() => {
    setIsRateLimited(false);
    setError(null);
    setArticles([]);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }
      if (cooldownTimeoutRef.current) {
        clearTimeout(cooldownTimeoutRef.current);
      }
    };
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentArticles = articles.slice(startIndex, endIndex);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
      <h2>News Feed</h2>
      {error && (
        <div style={{ 
          padding: '12px', 
          marginBottom: '16px', 
          backgroundColor: '#ffebee', 
          color: '#c62828', 
          borderRadius: '4px',
          border: '1px solid #ef9a9a',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>{error}</span>
          {isRateLimited ? (
            <button 
              onClick={handleReset}
              style={{
                padding: '4px 8px',
                backgroundColor: '#c62828',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Reset
            </button>
          ) : isInCooldown && (
            <span style={{ fontSize: '0.9em', color: '#666' }}>
              Cooldown active - {Math.ceil((COOLDOWN_PERIOD - (Date.now() - (cooldownTimeoutRef.current?.startTime || Date.now()))) / 1000)}s remaining
            </span>
          )}
        </div>
      )}
      <div style={{ marginBottom: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <select 
          value={endpoint} 
          onChange={handleEndpointChange}
          style={{ padding: '8px' }}
        >
          <option value="topHeadlines">Top Headlines</option>
          <option value="everything">Everything</option>
        </select>

        <input
          type="text"
          placeholder="Search news..."
          value={search}
          onChange={handleSearch}
          style={{ padding: '8px', width: '200px' }}
        />

        {endpoint === 'topHeadlines' && (
          <select 
            ref={categoryRef} 
            defaultValue="" 
            onChange={handleCategory}
            style={{ padding: '8px' }}
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        )}

        <select 
          ref={sourceRef} 
          defaultValue="" 
          onChange={handleSource}
          style={{ padding: '8px' }}
        >
          <option value="">All Sources</option>
          {SOURCES.map((source) => (
            <option key={source} value={source}>
              {source.charAt(0).toUpperCase() + source.slice(1)}
            </option>
          ))}
        </select>

        {endpoint === 'everything' && (
          <>
            <input
              type="date"
              name="from"
              value={dateRange.from}
              onChange={handleDateChange}
              style={{ padding: '8px' }}
            />
            <input
              type="date"
              name="to"
              value={dateRange.to}
              onChange={handleDateChange}
              style={{ padding: '8px' }}
            />
          </>
        )}
      </div>

      <div style={{ 
        marginTop: 24,
        minHeight: isInitialLoad ? '400px' : 'auto',
        position: 'relative'
      }}>
        {isTransitioning && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
            transition: 'opacity 0.3s ease-in-out',
            opacity: loading ? 1 : 0,
            pointerEvents: loading ? 'auto' : 'none'
          }}>
            <div style={{ 
              padding: '20px',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              Loading...
            </div>
          </div>
        )}

        <div style={{ 
          opacity: isTransitioning ? 0.6 : 1,
          transition: 'opacity 0.3s ease-in-out'
        }}>
          {articles.length === 0 && !loading && !isInitialLoad && (
            <div style={{ textAlign: 'center', padding: '20px' }}>No articles found.</div>
          )}
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 16
          }}>
            {currentArticles.map((a, idx) => (
              <div 
                key={idx} 
                style={{ 
                  border: '1px solid #ccc', 
                  borderRadius: 8, 
                  width: 240, 
                  padding: 8,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                <img 
                  src={a.urlToImage || 'https://via.placeholder.com/240x120?text=No+Image'} 
                  alt={a.title}
                  style={{ 
                    width: '100%', 
                    height: 120, 
                    objectFit: 'cover', 
                    borderRadius: 4 
                  }} 
                />
                <h4 style={{ margin: '8px 0' }}>{a.title}</h4>
                <p>{a.description ? a.description.slice(0, 80) + '...' : 'No description.'}</p>
                <div style={{ marginTop: '8px', fontSize: '0.9em', color: '#666' }}>
                  {a.source?.name && <span>Source: {a.source.name}</span>}
                  {a.publishedAt && (
                    <span style={{ marginLeft: '8px' }}>
                      {new Date(a.publishedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <Link 
                  to={`/article/${encodeURIComponent(a.url)}`}
                  style={{ 
                    color: '#0066cc', 
                    textDecoration: 'none',
                    display: 'inline-block',
                    marginTop: '8px'
                  }}
                >
                  Read More
                </Link>
              </div>
            ))}
          </div>

          {articles.length > 0 && !loading && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
              marginTop: '24px',
              padding: '16px',
              opacity: isTransitioning ? 0.6 : 1,
              transition: 'opacity 0.3s ease-in-out'
            }}>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                  padding: '8px 16px',
                  backgroundColor: currentPage === 1 ? '#ccc' : '#0066cc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  opacity: currentPage === 1 ? 0.5 : 1
                }}
              >
                Previous
              </button>
              
              <div style={{ 
                display: 'flex', 
                gap: '4px',
                alignItems: 'center'
              }}>
                {[...Array(totalPages)].map((_, idx) => {
                  const pageNum = idx + 1;
                  // Show first page, last page, current page, and pages around current page
                  const shouldShow = 
                    pageNum === 1 || 
                    pageNum === totalPages || 
                    Math.abs(currentPage - pageNum) <= 1;

                  if (!shouldShow) {
                    // Show ellipsis for gaps
                    if (pageNum === 2 || pageNum === totalPages - 1) {
                      return <span key={pageNum}>...</span>;
                    }
                    return null;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      style={{
                        padding: '8px 12px',
                        backgroundColor: currentPage === pageNum ? '#0066cc' : 'white',
                        color: currentPage === pageNum ? 'white' : '#0066cc',
                        border: '1px solid #0066cc',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        minWidth: '32px'
                      }}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                  padding: '8px 16px',
                  backgroundColor: currentPage === totalPages ? '#ccc' : '#0066cc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  opacity: currentPage === totalPages ? 0.5 : 1
                }}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withLoading(NewsFeed); 