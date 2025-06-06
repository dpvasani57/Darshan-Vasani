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
  const categoryRef = useRef();
  const sourceRef = useRef();
  const searchTimeoutRef = useRef(null);

  const fetchNews = useCallback(async (query = '', category = '', source = '') => {
    setLoading(true);
    try {
      let params = {
        apiKey: API_KEY,
        pageSize: 12,
      };

      if (endpoint === 'topHeadlines') {
        params = {
          ...params,
          country: 'us',
          category: category || undefined,
          q: query || undefined,
        };
      } else {
        // everything endpoint
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
      setArticles(data.articles || []);
    } catch (e) {
      console.error('Error fetching news:', e);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, [endpoint, dateRange]);

  useEffect(() => {
    fetchNews();
  }, [endpoint, dateRange]);

  const handleSearch = useCallback((e) => {
    const value = e.target.value;
    setSearch(value);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      fetchNews(value, categoryRef.current.value, sourceRef.current.value);
    }, 500);
  }, [fetchNews]);

  const handleCategory = useCallback(() => {
    fetchNews(search, categoryRef.current.value, sourceRef.current.value);
  }, [search, fetchNews]);

  const handleSource = useCallback(() => {
    fetchNews(search, categoryRef.current.value, sourceRef.current.value);
  }, [search, fetchNews]);

  const handleEndpointChange = useCallback((e) => {
    setEndpoint(e.target.value);
  }, []);

  const handleDateChange = useCallback((e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({ ...prev, [name]: value }));
  }, []);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
      <h2>News Feed</h2>
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

      <div style={{ marginTop: 24 }}>
        {articles.length === 0 && !loading && <div>No articles found.</div>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          {articles.map((a, idx) => (
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
      </div>
    </div>
  );
}

export default withLoading(NewsFeed); 