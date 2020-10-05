/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import Layout from "./layout"
import Title from "./title"
import Listing from "./listing"
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config"
import replaceSlashes from "../utils/replaceSlashes"
import usePosts from "../hooks/use-posts"

const Homepage = () => {
  const { basePath, blogPath } = useMinimalBlogConfig()
  const customizedPosts = usePosts()

  return (
    <Layout>
      <Title text="Latest Posts">
        <Link to={replaceSlashes(`/${basePath}/${blogPath}`)}>Read all posts</Link>
      </Title>
      <Listing posts={customizedPosts.nodes} showTags={false} />
    </Layout>
  )
}

export default Homepage
