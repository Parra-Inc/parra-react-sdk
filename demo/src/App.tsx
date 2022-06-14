import './App.css';
import {
  ParraCardView,
  ParraProvider,
  ParraFeedbackProvider,
} from '@parra/react-sdk';

function App() {
  return (
    <div className="App">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ParraProvider
          tenantId="abc123"
          authorization={async () => 'abc123'}
          options={{}}
        >
          <ParraFeedbackProvider>
            <ParraCardView
              cardsResponse={{ items: [] }}
              onDismissClicked={() => {}}
            />
          </ParraFeedbackProvider>
        </ParraProvider>
      </div>
    </div>
  );
}

export default App;
