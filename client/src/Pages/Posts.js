import { Button,Form } from "react-bootstrap";
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal"

function Posts(){
    const navigate = useNavigate();
    const [posts,setPosts]=useState([]);
    const [updatedPost, setUpdatedPost] = useState({});
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(()=>{
        axios.get("http://localhost:3001/api/posts")
        .then((res)=> {
            console.log(res);
            setPosts(res.data);
        })
        .catch((err)=>console.log(err));

    },[])

    const deletePost =(id)=>{
        axios.delete(`http://localhost:3001/api/delete/${id}`).then(res=>console.log(res).catch(err=>console.log(err)))
        window.location.reload();
    }

    const updatePost=(post)=>{
        setUpdatedPost(post);
        handleShow();
    }

    const handleChange= (e) =>{
        const {name, value} = e.target;
        setUpdatedPost((prev)=>{
            return{
                ...prev,
                [name]:value,
            };
        });
    }

    const saveUpdatedPost = () =>{
        axios.put(`http://localhost:3001/api/update/${updatedPost._id}`, updatedPost)
        .then(res=>console.log(res)
        .catch(err => console.log(err)));
        handleClose();
        window.location.reload();
    };

    return(
        <div style={{width:"90%", textAlign:"center", margin:"auto auto"}}>
            <h1>Posts page</h1>
            <Button style={{width:"100%", marginBottom:"1rem"}} variant="outline-dark" onClick={()=> navigate(-1)}>BACK</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Update a Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control 
                            style={{marginBottom:"1rem"}} 
                            placeholder="title" 
                            name="title" 
                            value={updatedPost.title ? updatedPost.title : ""}
                            onChange={handleChange}
                            />
                            <Form.Control 
                            placeholder="description" 
                            name="description" 
                            value={updatedPost.description ? updatedPost.description : ""}
                            onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={saveUpdatedPost}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
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
                                    <Button variant="outline-info" style={{width:"100%", marginRight:"1rem"}} onClick={()=>updatePost(post)}>Update</Button>
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