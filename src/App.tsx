import Survey from './components/Survey';
import Preview from './components/preview/Preview';
import { useAppSelector } from './store/hooks';
import './style/global.css';

function App() {
  const isOpen = useAppSelector((state) => state.preview.open);

  return (
    <>
      {isOpen && <Preview />}
      {!isOpen && <Survey />}
    </>
  );
}

export default App;
