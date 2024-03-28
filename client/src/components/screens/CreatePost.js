import React,{useState,useEffect} from "react";
import {useNavigate} from "react-router-dom"
import M from 'materialize-css'

const createPost=()=>{
    const navigate = useNavigate()
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")

    useEffect(()=>{
        if(url){
        fetch("/createpost",{
            method:"post",
            headers:{
                "Content-type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title,
                body,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html:data.error,classes:"#c62828 red darken-3"})
            }
            else{
                M.toast({html:"posted successfully",classes:"#00e676 green accent-3"})
                navigate('/')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    },[url])

    const PostDetails = ()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","insta-clone")
        data.append("cloud_name","snakeyes")
        fetch("https://api.cloudinary.com/v1_1/snakeyes/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
       
    }
    return(
        <div className="card input-filed"
        style={{
            margin:"10px auto",
            maxwidth:"500px",
            padding:"20px",
            textAlign:"center"
        }}
        >
            <input type="text" placeholder="title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />
            <input type="text" placeholder="body"
            value={body}
            onChange={(e)=>setBody(e.target.value)}
            />
            <div className="file-field input-field">
                <div className="btn">
                    <span>Upload</span>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
                </div>
                <button className="btn waves-effect waves-light #64b5f6 blue lighten-2"
                onClick={()=>PostDetails()}
                >
                    Submit Post
                </button>
        </div>
    )
}

export default createPost