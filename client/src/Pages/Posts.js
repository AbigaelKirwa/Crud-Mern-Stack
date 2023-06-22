import { useEffect } from "react"
import axios from "axios"

function Posts(){
    useEffect(()=>{
        axios.get("/posts")
        .then((res)=> console.log(res))
        .catch((err)=>console.log(err));
    },[])
    return(
        <div style={{width:"90%", textAlign:"center", margin:"auto auto"}}>
            <h1>Posts page</h1>
        </div>
    )
}

export default Posts