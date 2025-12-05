import GlobalContext from './components/GlobalContext';
import PerspectiveBridge from './components/PerspectiveBridge';

function App() {
  return (
    <div className="bg-[#FAFAFA] text-[#121212] min-h-screen">
      <GlobalContext />
      <PerspectiveBridge />
    </div>
  );
}

export default App;
