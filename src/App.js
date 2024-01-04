
import './App.css';
import LoginPage from './Component/LoginHome/LoginPage';
import Layout from './Component/NavBar/MainPage/Layout';
import NavBar from './Component/NavBar/NavBar';


function App() {
  
  return (
    <div className="App">
      {

        localStorage.getItem('user') == undefined ? <LoginPage /> :
          <>
            <NavBar />
            <Layout />

          </>
      }
    </div>
  );
}

export default App;
