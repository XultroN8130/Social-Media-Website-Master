import React,{useContext} from "react";
import { Link ,useNavigate} from "react-router-dom";
import {UserContext} from '../App'
const NavBar= ()=>{
  const {state,dispatch} = useContext(UserContext)
  const navigate = useNavigate()
  const renderList = ()=>{
    if(state){
      return[
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/create">Create Post</Link></li>,
        <li><Link to="/myfollowingpost">My following posts</Link></li>,
        <li>
          <button className="btn waves-effect waves-light #64b5f6 blue lighten-2"
              onClick={()=>{
                localStorage.clear()
                dispatch({type:"CLEAR"})
                navigate('/signin')
              }}
              >
                  Logout
            </button>
        </li>
      ]
    }else{
      return[
        <li><Link to="/signin">Sign In</Link></li>, 
        <li><Link to="/signup">Sign Up</Link></li>
      ]
    }
  }
    return(
    <nav>
    <div className="nav-wrapper white" >
      <Link to={state?"/":"/signin"} className="brand-logo left">Instagram</Link>
      <ul id="nav-mobile" className="right">
        {renderList()}
      </ul>
    </div>
  </nav>
    )
}

export default NavBar