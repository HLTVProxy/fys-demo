import { Router, Route } from 'wouter';
import { SWRConfig } from 'swr';
import Home from './pages/Home';

function App() {
  return (
    <SWRConfig
      value={{
        refreshInterval: 60000,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <div className="min-h-screen bg-gray-50">
        <Router>
          <Route path="/" component={Home} />
        </Router>
      </div>
    </SWRConfig>
  );
}

export default App;
