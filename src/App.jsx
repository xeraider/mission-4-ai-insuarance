import './App.css'
import Navbar from "./components/Navbar.jsx";
import ChatWindow from "./components/ChatWindow.jsx";
import Resources from "./components/Resources.jsx";

function App() {

  return (
    <>
      <header>
        <Navbar/>
      </header>

      <main>
        <ChatWindow/>
      </main>

      <footer>
        <Resources/>
      </footer>
    </>
  )
}

export default App
