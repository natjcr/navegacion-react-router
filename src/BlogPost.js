import React, { useEffect } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { blogdata } from './blogdata.js'
import { useAuth } from './auth'

export function BlogPost() {
    const { postDeleted, setPostDeleted } = useOutletContext()
    const navigate = useNavigate()
    const { slug } = useParams()
    const { user } = useAuth()
    const blogPost = blogdata.find(post => post.slug === slug)

    const userIsAuthor = user?.username === blogPost.author
    const userIsEditor = user?.isEditor
    const userIsSpellChecker = user?.isSpellChecker
    const userIsModerator = user?.isModerator

    const returnToBlog = () => {
        navigate('/blog')
    }

    // ACTION CREATORS
    const onDelete = () => {
        setPostDeleted(true)
        blogPost.deleted = true
    }

    useEffect(() => {
        setPostDeleted(blogPost.deleted)
    }, [blogPost, setPostDeleted])

    if (!postDeleted) {
        return (
            <>
                <button onClick={returnToBlog}>return to blog</button>
                <h2>{blogPost.title}</h2>
                <li>{blogPost.author}</li>
                <p>{blogPost.content}</p>

                {userIsModerator && <button>Marca tu favorito</button>}
                {(userIsModerator || userIsAuthor) && (
                    <button onClick={onDelete}>Eliminar Blog</button>
                )}
                {(userIsEditor || userIsAuthor) && <button>Modificar Blog</button>}
                {(userIsSpellChecker || userIsAuthor) && (
                    <button>Corregir Contenido</button>
                )}
            </>
        )
    } else {
        return <p>{blogPost.title} has been deleted</p>
    }
}