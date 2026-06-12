import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import GettingStarted from './pages/GettingStarted';
import Authentication from './pages/Authentication';
import ApiKeys from './pages/ApiKeys';
import Installments from './pages/Installments';
import Applications from './pages/Applications';
import Dashboard from './pages/Dashboard';
import Scopes from './pages/Scopes';
import Security from './pages/Security';
import Examples from './pages/Examples';
import Status from './pages/Status';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="getting-started" element={<GettingStarted />} />
        <Route path="authentication" element={<Authentication />} />
        <Route path="api-keys" element={<ApiKeys />} />
        <Route path="installments" element={<Installments />} />
        <Route path="applications" element={<Applications />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="scopes" element={<Scopes />} />
        <Route path="security" element={<Security />} />
        <Route path="examples" element={<Examples />} />
        <Route path="status" element={<Status />} />
      </Route>
    </Routes>
  );
}
