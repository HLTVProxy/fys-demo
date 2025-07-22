import { Route, Switch } from "wouter";
import { SWRConfig } from "swr";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import SplashVideo from "./components/SplashVideo";
import Ebans from "./pages/Ebans";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <SWRConfig
      value={{
        refreshInterval: 60000,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <div className="flex w-full flex-col">
        <Navbar />
        <SplashVideo />
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/ebans" component={Ebans} />
          <Route>404: No such page!</Route>
        </Switch>
      </div>
    </SWRConfig>
  );
};

export default App;
