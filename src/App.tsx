import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import './style/global.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
