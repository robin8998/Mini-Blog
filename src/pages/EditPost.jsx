import React ,{useState,useEffect} from 'react'
import databaseService from '../appwrite/config'
import { Container, PostForm } from '../components'
import { useNavigate,useParams } from 'react-router'

function EditPost() {
    const [posts,setPosts] = useState(null)
    const navigate = useNavigate()
    const {slug} = useParams()

    useEffect(() => {
      if(slug){
        databaseService.getPost(slug).then((post)=>{
            if(post){
            setPosts(post)
            }
        })
      }
      else{
        navigate("/")
      }
    }, [slug,navigate])
    

  return posts ? (
    <div className='py-8'>
        <Container>
            <PostForm post={posts}/>
        </Container>
    </div>
  ) : null
}

export default EditPost