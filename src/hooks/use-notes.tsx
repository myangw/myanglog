import { graphql, useStaticQuery } from "gatsby"
    
    type Props = {
      posts: {
        slug: string
        title: string
        date: string
        description: string
        tags?: {
          name: string
          slug: string
        }[]
      }[]
    }
    
    const useNotes = () => {
      const data = useStaticQuery<Props>(graphql`
      query {
        notes: allPost(sort: { fields: date, order: DESC }) {
          nodes {
            slug
            title
            date(formatString: "YYYY.MM.DD")
            description
            tags {
              name
              slug
            }
          }
        }
      }
    `)
    
      return data.notes
    }
    
    export default useNotes