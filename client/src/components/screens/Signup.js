import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import M from 'materialize-css'

const SignIn =()=>{
    const navigate = useNavigate()
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState(undefined)
    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url])
    const uploadPic =()=>{
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

    const uploadFields =()=>{
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html:data.error,classes:"#c62828 red darken-3"})
            }
            else{
                M.toast({html :data.message,classes:"#00e676 green accent-3"})
                navigate('/signin')
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    const PostData = ()=>{
        if(image){
            uploadPic()
        }else{
            uploadFields()
        }
        
    }
    return(
        <div className="mycard">
            <div className="card auth-card">
                <h2>Instagram</h2>
                <input
                type="text"
                placeholder="Username"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />
                <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                <input
                type="text"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
                <div className="file-field input-field">
                <div className="btn">
                    <span>Upload Profile Pic</span>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
                </div>
                <button className="btn waves-effect waves-light #64b5f6 blue lighten-2"
                onClick={()=>PostData()}
                >
                    SignUp
                </button>
                <h5>
                    <Link to="/signin">Already have an account ?</Link>
                </h5>
            </div>
        </div>
    )
}

export default SignIn