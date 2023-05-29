import EventsFlow from "./pages/events-flow";
import { ReactFlowProvider } from "reactflow";

export default function App() {
  return (
    <div className="app">
      <ReactFlowProvider>
        <EventsFlow />
      </ReactFlowProvider>
    </div>
  );
}
