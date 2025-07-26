import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import SplashVideo from "./components/SplashVideo";
import Bans from "./pages/Bans";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "./components/ui/sonner";

const App = () => {
  return (
    <div className="flex w-full flex-col">
      <Navbar />
      <SplashVideo />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/bans" component={Bans} />
        <Route>404: No such page!</Route>
      </Switch>
      <Toaster />
    </div>
  );
};

export default App;
