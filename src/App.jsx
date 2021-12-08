import Formulario from './components/Formulario';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

function App(){
  return (
    <div className="App">
      <header className="App-header">
        <Formulario/>
      </header>
    </div>
  );
}
//<img src={logo} className="App-logo" alt="logo" />

export default App;