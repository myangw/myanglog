/** @jsx jsx */
import React from "react"
import { Global } from "@emotion/core"
import { Box, Container, jsx } from "theme-ui"
import "typeface-ibm-plex-sans"
import SEO from "./seo"
import Header from "./header"
import Footer from "./footer"
import CodeStyles from "../styles/code"
import SkipNavLink from "./skip-nav"

type LayoutProps = { children: React.ReactNode; className?: string }

const Layout = ({ children, className = `` }: LayoutProps) => (
  <React.Fragment>
    <Global
      styles={(theme) => ({
        "*": {
          boxSizing: `inherit`,
          fontSize: `1.2rem`,
        },
        html: {
          WebkitTextSizeAdjust: `100%`,
        },
        img: {
          borderStyle: `none`,
          maxWidth: `100%`,
          width: `auto`,
        },
        "@media screen and (min-width: 700px)": {
          img: {
            maxWidth: `900px`,
          },
        },
        "@media screen and (max-width: 699px)": {
          img: {
            maxWidth: `300px`,
          },
        },
        strong: {
          fontSize: `1rem`
        },
        pre: {
          fontFamily: `monospace`,
          fontSize: `1em`,
        },
        "[hidden]": {
          display: `none`,
        },
        "::selection": {
          backgroundColor: theme.colors.text,
          color: theme.colors.background,
        },
        a: {
          transition: `all 0.3s ease-in-out`,
          color: `text`,
          fontSize: `1rem`
        },
      })}
    />
    <SEO />
    <SkipNavLink>Skip to content</SkipNavLink>
    <Container>
      <Header />
      <Box id="skip-nav" sx={{ ...CodeStyles }} className={className}>
        {children}
      </Box>
      <Footer />
    </Container>
  </React.Fragment>
)

export default Layout
