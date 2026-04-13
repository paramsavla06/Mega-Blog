import { useState, useEffect } from 'react'
import { Container, Postcard } from '../components'
import supabaseService from "../supabase/config";

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        supabaseService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts)
            }
        })
    }, [])
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.slug} className='p-2 w-1/4'>
                        <Postcard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts