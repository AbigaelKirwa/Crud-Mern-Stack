import { Button } from "react-bootstrap";
import { useEffect, useState } from "react"
import axios from "axios"

function Posts(){

    const [posts,setPosts]=useState([]);
    useEffect(()=>{
        axios.get("/api/posts")
        .then((res)=> {
            console.log(res);
            setPosts(res.data);
        })
        .catch((err)=>console.log(err));

    },[])

    const deletePost =(id)=>{
        axios.delete(`/api/delete/${id}`).then(res=>console.log(res).catch(err=>console.log(err)))
        window.location.reload();
    }
    return(
        <div style={{width:"90%", textAlign:"center", margin:"auto auto"}}>
            <h1>Posts page</h1>
            {posts?(
                <>
                    {posts.map(post=>{
                        return(
                            <div 
                            key={post._id}
                            style={{
                            border:"solid lightgray 1px", 
                            borderRadius:"8px",
                            marginBottom:"1rem",
                            padding:"1rem"
                            }}>
                                <h4>{post.title}</h4>
                                <p>{post.description}</p>
                                <div style={{
                                    display:"flex", 
                                    flexDirection:"row", 
                                    justifyContent:"space-between"
                                    }}>
                                    <Button variant="outline-info" style={{width:"100%", marginRight:"1rem"}}>Update</Button>
                                    <Button onClick={()=> deletePost(post._id)} variant="outline-danger" style={{width:"100%", marginRight:"1rem"}}>Delete</Button>
                                </div>
                            </div>
                        )
                    })}
                </>
            ):""}
        </div>
    )
}

export default Posts