/** @jsx jsx */
import { jsx, Heading, Link as TLink } from "theme-ui"
import { Link } from "gatsby"
import { Flex } from "@theme-ui/components"
import Layout from "./layout"
import Listing from "./listing"
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config"
import replaceSlashes from "../utils/replaceSlashes"
import SEO from "./seo"
import useNotes from "../hooks/use-notes"

const Note = () => {
  const { tagsPath, basePath } = useMinimalBlogConfig()
  const customizedPosts = useNotes()

  return (
    <Layout>
      <SEO title="Note" />
      <Flex sx={{ alignItems: `center`, justifyContent: `space-between`, flexFlow: `wrap` }}>
        <Heading variant="styles.h1">Note</Heading>
        <TLink as={Link} sx={{ variant: `links.primary` }} to={replaceSlashes(`/${basePath}/${tagsPath}`)}>
          View all tags
        </TLink>
      </Flex>
      <Listing posts={customizedPosts.nodes} sx={{ mt: [4, 5] }} />
    </Layout>
  )
}

export default Note
