import './App.css';
import { Reset } from 'styled-reset'
import Layout from './components/Layout';

function App() {
  return (
    <div className="App">
      <Layout>
        <Reset />
        <div>mr dinner service</div>
      </Layout>
    </div>
  );
}

export default App;
