
import './App.css';
import Mainbar from './components/Mainbar/Mainbar';
import Menubar from './components/Menubar/Menubar';


const App = () => {
  return (
    <div className="app">
      <Menubar />
      <Mainbar />
    </div>
  )
}

export default App;
