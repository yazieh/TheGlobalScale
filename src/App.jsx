import GlobalContext from './components/GlobalContext';
import MultiplierMatchup from './components/MultiplierMatchup';

function App() {
  return (
    <div className="bg-[#FAFAFA] text-[#121212] min-h-screen">
      <GlobalContext />
      <MultiplierMatchup />
    </div>
  );
}

export default App;
