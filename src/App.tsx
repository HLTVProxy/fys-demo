import { Router, Route } from 'wouter';
import { SWRConfig } from 'swr';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Users } from './pages/Users';
import { UserDetail } from './pages/UserDetail';

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
        <Navigation />
        <Router>
          <Route path="/" component={Home} />
          <Route path="/users" component={Users} />
          <Route path="/users/:id" component={UserDetail} />
        </Router>
      </div>
    </SWRConfig>
  );
}

export default App;
