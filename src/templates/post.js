import React from "react"
import { graphql, Link } from "gatsby"
import SiteLayout from "../components/SiteLayout"
import PostEntryMeta from "../components/PostEntryMeta"
import PostEntryTitle from "../components/PostEntryTitle"
import PostEntryMedia from "../components/PostEntryMedia"
import Seo from "../components/Seo"

const renderTermNodes = (nodes, termType) => (
  <span className="cat-links header-font extra-small medium smooth dark-gray">
    {nodes.map(term => (
      <Link to={`/blog/${termType}/${term.slug}`}>{term.name}</Link>
    ))}
  </span>
)

const renderTerms = (categoryNodes = [], tagNodes = []) => (
  <>
    {categoryNodes ? renderTermNodes(categoryNodes, "category") : null}
    {tagNodes && tagNodes.length ? renderTermNodes(tagNodes, "tag") : null}
  </>
)

const Post = props => {
  const {
    location,
    data: {
      wpgraphql: { post },
    },
  } = props
  const { title, content } = post
  return (
    <SiteLayout location={location}>
      <Seo title={`${post.title}`} />
      <div className="post-wrapper">
        <header className="entry-header top-spacer bottom-spacer">
          <PostEntryTitle
            location="single"
            post={post}
            titleClass="entry-title h1"
          />

          <PostEntryMeta post={post} />
        </header>
        {post.featuredImage && <PostEntryMedia post={post} location="single" />}

        <div
          className="entry-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
      <footer className="entry-footer flex justify-between">
        <div className="flex justify-start items-center">
          <a
            className="comments-trigger button button--mobile-fullwidth center-align"
            id="comments-trigger"
            href="#" //TODO: setup the comment functionality
          >
            <span className="display-none">Close Comments</span>

            <span className="display-inline-block">Leave a Comment</span>
          </a>
        </div>

        <div className="entry-footer__taxonomy justify-end self-center items-center">
          {post.categories.nodes.length || post.tags.nodes.length
            ? renderTerms(post.categories.nodes, post.tags.nodes)
            : null}
        </div>
      </footer>
    </SiteLayout>
  )
}

export default Post

export const pageQuery = graphql`
  query GET_POST($id: ID!) {
    wpgraphql {
      post(id: $id) {
        title
        content
        uri
        featuredImage {
          sourceUrl
          title
        }
        author {
          name
          slug
        }
        tags {
          nodes {
            name
            slug
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`