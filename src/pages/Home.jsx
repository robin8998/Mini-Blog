import React ,{useState,useEffect} from 'react'
import { Container , PostCard} from '../components'
import databaseService from '../appwrite/config'


function Home() {
    const [posts,setPosts ] = useState([])

    useEffect(() => {
      databaseService.getAllPosts([]).then((postsData)=>{
            if(postsData){
                setPosts(postsData.documents)
            }
      })
    }, [])
    
   if(posts.length > 0){
    return (
        <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post)=>{
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard  post={post}/>  // ToDo : try this also : ...post
                    </div>
                })}
            </div>
        </Container>
    </div>
    )
   }

   return(
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                <div className='p-2 w-full'>
                    <h1 className='text-2xl font-bold hover:text-gray-500'>Login To read posts</h1>
                </div>
            </div>
        </Container>
    </div>
   )
}

export default Home