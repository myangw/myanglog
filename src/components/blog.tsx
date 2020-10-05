/** @jsx jsx */
import { jsx, Heading, Link as TLink } from "theme-ui"
import { Link } from "gatsby"
import { Flex } from "@theme-ui/components"
import Layout from "./layout"
import Listing from "./listing"
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config"
import usePosts from "../hooks/use-posts"
import replaceSlashes from "../utils/replaceSlashes"
import SEO from "./seo"

const Blog = () => {
  const { tagsPath, basePath } = useMinimalBlogConfig()
  const customizedPosts = usePosts()

  return (
    <Layout>
      <SEO title="Blog" />
      <Flex sx={{ alignItems: `center`, justifyContent: `space-between`, flexFlow: `wrap` }}>
        <Heading variant="styles.h2">Blog</Heading>
        <TLink as={Link} sx={{ variant: `links.primary` }} to={replaceSlashes(`/${basePath}/${tagsPath}`)}>
          View all tags
        </TLink>
      </Flex>
      <Listing posts={customizedPosts.nodes} sx={{ mt: [4, 5] }} />
    </Layout>
  )
}

export default Blog
