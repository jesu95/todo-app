import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ListTodoComponent from './components/ListTodoComponent';
import EditTodoComponent from './components/EditTodoComponent';

function App() {
  return (
    <div>
      <Router>
        <div className="container">
          <Routes>
            <Route path = "/" exact element = {<ListTodoComponent />}></Route>
            <Route path = "/edit/:id" element = {<EditTodoComponent />}></Route>
          </Routes>
        </div>
      </Router>
    </div>

    
  );
}

export default App;
