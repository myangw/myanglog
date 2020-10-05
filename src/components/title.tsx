/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import { Box } from "@theme-ui/components"

type TitleProps = {
  children: React.ReactNode
  as?: string
  className?: string
  text: string
}

const Title = ({ text, children, as = `h2`, className = `` }: TitleProps) => (
  <div
    sx={{
      justifyContent: `space-between`,
      alignItems: `center`,
      pt: 5,
      pb: 1,
      mb: 4,
      flexFlow: `wrap`,
      boxSizing: `border-box`,
      display: `flex`,
    }}
  >
    <Box
      as={as}
      sx={{ fontWeight: `medium`, fontSize: [3, 4], fontFamily: `heading`, lineHeight: `heading`, color: `heading` }}
      className={className}
    >
      {text}
    </Box>
    <div
      sx={{
        color: `primary`,
        a: {
          variant: `links.primary`,
        },
      }}
    >
      {children}
    </div>
  </div>
)

export default Title
