import { Button } from 'react-bootstrap';
import {useNavigate} from "react-router-dom"

function App() {
  const navigate = useNavigate();
  return (
    <div style={{width:"90%", margin:"auto auto", textAlign:"center"}}>
      <h1>Home Page</h1>
      <Button 
      style={{width:"100%" }} 
      variant='outline-dark'
      onClick={()=> navigate("create")}
      >Next</Button>
    </div>
  );
}

export default App;
