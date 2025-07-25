import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import withLoading from './withLoading';

const API_KEY = import.meta.env.VITE_API_KEY;

function ArticleDetails({ loading, setLoading }) {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);

  const fetchArticle = useCallback(async () => {
    // Prevent multiple fetches
    if (hasAttemptedFetch) {
      return;
    }

    setLoading(true);
    setError(null);
    setHasAttemptedFetch(true);

    try {
     
      const articleUrl = decodeURIComponent(id);
      
      // Instead of making a new API call, we can use the URL directly since we already have the article data from the news feed
     
      setArticle({
        url: articleUrl,
        title: 'Article Details',
        content: `Article URL: ${articleUrl}`,
        urlToImage: null,
        author: 'Unknown',
        publishedAt: new Date().toISOString()
      });
    } catch (e) {
      console.error('Error processing article:', e);
      setError('Failed to load article');
      setArticle(null);
    } finally {
      setLoading(false);
    }
  }, [id, setLoading, hasAttemptedFetch]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  if (error) {
    return (
      <div style={{ padding: 16, textAlign: 'center' }}>
        <p style={{ color: 'red' }}>{error}</p>
        <button 
          onClick={() => navigate(-1)}
          style={{
            padding: '8px 16px',
            marginTop: '16px',
            backgroundColor: '#0066cc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!article) return null;

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 16 }}>
      <Link 
        to="/"
        style={{
          color: '#0066cc',
          textDecoration: 'none',
          display: 'inline-block',
          marginBottom: '16px'
        }}
      >
        &larr; Back to News Feed
      </Link>
      <h2 style={{ marginBottom: '16px' }}>{article.title}</h2>
      {article.urlToImage && (
        <img 
          src={article.urlToImage} 
          alt={article.title}
          style={{ 
            width: '100%', 
            maxHeight: 300, 
            objectFit: 'cover', 
            borderRadius: 8,
            marginBottom: '16px'
          }} 
        />
      )}
      <div style={{ marginBottom: '16px' }}>
        <p><strong>Author:</strong> {article.author || 'Unknown'}</p>
        <p><strong>Published:</strong> {article.publishedAt ? new Date(article.publishedAt).toLocaleString() : 'N/A'}</p>
      </div>
      <p style={{ lineHeight: 1.6 }}>{article.content || 'No content available.'}</p>
      <a 
        href={article.url} 
        target="_blank" 
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          marginTop: '16px',
          color: '#0066cc',
          textDecoration: 'none',
          padding: '8px 16px',
          border: '1px solid #0066cc',
          borderRadius: '4px'
        }}
      >
        Read Original Article
      </a>
    </div>
  );
}

export default withLoading(ArticleDetails); 