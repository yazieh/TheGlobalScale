import GlobalContext from './components/GlobalContext';
import MultiplierMatchup from './components/MultiplierMatchup';
import DonationFlow from './components/DonationFlow';

function App() {
  return (
    <div className="bg-[#FAFAFA] text-[#121212] min-h-screen">
      <GlobalContext />
      <MultiplierMatchup />
      <DonationFlow />
    </div>
  );
}

export default App;
