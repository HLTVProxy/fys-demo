import { Route, Switch } from "wouter";
import { SWRConfig } from "swr";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <SWRConfig
      value={{
        refreshInterval: 60000,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <div className="flex h-screen w-full flex-col bg-gray-800">
        <Navbar />
        <div className="container mx-auto pt-20">
          <Switch>
            <Route path="/" component={Home} />
            <Route>404: No such page!</Route>
          </Switch>
        </div>
      </div>
    </SWRConfig>
  );
}

export default App;
