import { StoreProvider } from "./stores";
import Content from "./Content";

const EventsFlowIndex = (props: any) => (
  <StoreProvider {...props}>
    <Content />
  </StoreProvider>
);

export default EventsFlowIndex;
