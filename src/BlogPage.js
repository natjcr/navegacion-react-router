import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { blogdata } from './blogdata.js'

export function BlogPage() {
    const [postDeleted, setPostDeleted] = useState(false)

    return (
        <>
            <h1>BlogPage</h1>

            <Outlet context={{ postDeleted, setPostDeleted }} />
            <ul>
                {blogdata.map(post => {
                    if (post.deleted) return null
                    return <BlogLink key={post.slug} post={post}></BlogLink>
                })}
            </ul>
        </>
    )
}

function BlogLink({ post }) {
    return (
        <li>
            <NavLink to={`/blog/${post.slug}`}>{post.title}</NavLink>
        </li>
    )
}