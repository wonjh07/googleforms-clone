import { Routes, Route } from 'react-router-dom';
import Survey from './components/Survey';
import Preview from './components/preview/Preview';
import Result from './components/result/Result';
import './style/theme.css';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Survey />} />
      <Route path="/preview" element={<Preview />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  );
};

export default Router;
