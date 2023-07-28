import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { blogdata } from "./blogdata.js"

function BlogPost() {
    const navigate = useNavigate();

    const { slug } = useParams();

    const blogpost = blogdata.find(post => post.slug === slug)

    const returnToBlog = () => {
        navigate('/blog')
    }

    return(
       <>
        <h2>{blogpost.title}</h2>
        <button onClick={returnToBlog}>Volver al Blog</button>
        <p>{blogpost.author}</p>
        <p>{blogpost.content}</p>
       </> 
       
    )
}


export { BlogPost }