import "./App.css";
import Feed from "./Feed";
import Header from "./Header";
import Login from "./Login";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <>
          <Header />
          <Feed />
        </>
      )}
    </div>
  );
}

export default App;
