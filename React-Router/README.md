# React Router Learning Project

A comprehensive React Router implementation demonstrating various routing patterns and navigation techniques. This project serves as both a learning resource and a practical example of React Router v6 features.

## Project Structure

```
src/
├── App.jsx                 # Main application component with root routing
├── components/
│   ├── Navigation.jsx      # Main navigation component
│   ├── levelmain/          # Level container components
│   │   ├── LevelMain1.jsx
│   │   ├── LevelMain2.jsx
│   │   └── ... (up to LevelMain10)
│   ├── level1/            # Level 1 page components
│   │   ├── Level1Page1.jsx
│   │   ├── Level1Page2.jsx
│   │   └── ... (up to Level1Page10)
│   ├── level2/            # Level 2 page components
│   │   ├── Level2Page1.jsx
│   │   └── ... (up to Level2Page10)
│   └── ... (up to level10)
└── index.jsx              # Application entry point
```

## Routing Implementation

### Root Level Routing
```jsx
// App.jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Navigation />}>
      <Route path="level1/*" element={<LevelMain1 />} />
      <Route path="level2/*" element={<LevelMain2 />} />
      {/* ... up to level10 */}
    </Route>
  </Routes>
</BrowserRouter>
```

### Level Container Routing
```jsx
// LevelMain1.jsx (similar structure for other levels)
<Routes>
  <Route path="/" element={<Navigate to="Level1Page1" />} />
  <Route path="Level1Page1" element={<Level1Page1 />} />
  <Route path="Level1Page2" element={<Level1Page2 />} />
  {/* ... up to Level1Page10 */}
</Routes>
```

## Features

1. **Hierarchical Routing**
   - Root level navigation between different levels
   - Nested routing within each level
   - Dynamic page navigation

2. **Navigation Components**
   - Main navigation bar for level selection
   - Level-specific navigation for page selection
   - Active link highlighting
   - Responsive design

3. **Styling**
   - Modern UI with Tailwind CSS
   - Consistent purple/blue theme
   - Responsive layouts
   - Interactive hover effects

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Dependencies

- React
- React Router DOM v6
- Tailwind CSS

## Learning Resources

Each level contains 10 pages of educational content about React Router:

### Level 1: Basics
- Introduction to React Router
- Setting up React Router
- Navigation Components
- Route Parameters
- Nested Routes
- Protected Routes
- Query Parameters
- Route Guards
- Error Handling
- Advanced Routing Patterns

### Level 2-10
- Additional advanced topics and patterns
- Real-world routing scenarios
- Best practices and optimization

## Contributing

Feel free to contribute to this project by:
1. Forking the repository
2. Creating a feature branch
3. Submitting a pull request

## License

MIT License