import GlobalContext from './components/GlobalContext';
import ContextExplainer from './components/ContextExplainer';
import MultiplierMatchup from './components/MultiplierMatchup';
import DonationFlow from './components/DonationFlow';

function App() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-rose-200 selection:text-rose-900">
      <GlobalContext />
      <ContextExplainer />
      <div id="matchup-section">
        <MultiplierMatchup />
      </div>
    </div>
  );
}

export default App;
