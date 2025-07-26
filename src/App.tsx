import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import SplashVideo from "./components/SplashVideo";
import Bans from "./pages/Bans";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "./components/ui/sonner";
import { useInit } from "./hooks/useInit";
import NotFound from "./pages/NotFound";

const App = () => {
  useInit();

  return (
    <div className="flex w-full flex-col">
      <Navbar />
      <SplashVideo />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/bans">
          <ProtectedRoute component={Bans} />
        </Route>
        <Route component={NotFound}></Route>
      </Switch>
      <Toaster />
    </div>
  );
};

export default App;
