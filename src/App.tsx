import { useMachine } from '@xstate/react';
import Machine from './fsm/Machine';
import Header from './Header';
import InfoCard from './InfoCard';
import InputCard from './InputCard';
import ResultsCard from './ResultsCard';
import StateChart from './StateDiagram';
import StatusCard from './StatusCard';

function App() {
  const [state, send] = useMachine(Machine);

  const { inputText, scores } = state.context;

  const isLoading = state.matches('LoadingModels');
  const isPreparing = state.matches('PreparingTopics');
  const isSummarizing = state.matches('Analyzing.Summarizing');
  const isEmbedding = state.matches('Analyzing.Embedding');
  const isScoring = state.matches('Analyzing.Scoring');
  const isDone = state.matches('Done');

  const isBusy = isLoading || isPreparing || state.matches('Analyzing');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Header />

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 min-w-0 space-y-4">
            <StatusCard
              stateValue={state.value}
              isBusy={isBusy}
              isLoading={isLoading}
              isPreparing={isPreparing}
              isSummarizing={isSummarizing}
              isEmbedding={isEmbedding}
              isScoring={isScoring}
            />
            <InputCard
              inputText={inputText}
              canAnalyze={state.can({ type: 'ANALYZE' })}
              canEnterText={state.can({ type: 'SET_TEXT', value: '' })}
              canReset={state.can({ type: 'RESET' })}
              onTextChange={value => send({ type: 'SET_TEXT', value })}
              onAnalyze={() => send({ type: 'ANALYZE' })}
              onReset={() => send({ type: 'RESET' })}
            />
            <InfoCard />
          </div>
          <div className="flex-1 min-w-0 space-y-4">
            <StateChart currentState={state.value} />
          </div>

          <div className="flex-1 min-w-0 space-y-4">
            {isDone && scores && <ResultsCard scores={scores} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
