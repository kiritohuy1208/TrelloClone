import BoardContent from "components/BoardContent/BoardContent";
import "./App.scss";
import AppBar from "./components/AppBar/AppBar";
import BoardBar from "./components/BoardBar/BoardBar";

function App() {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <div className="master-trello">
      <AppBar />
      <BoardBar />
      <BoardContent />
    </div>
  );
}

export default App;
