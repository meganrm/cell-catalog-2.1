import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'


const CellLineTableTemplate = (props) => {
  
  const { edges: cellLines } = props.data.allMarkdownRemark;

  return (
    <div className="columns is-multiline">
      {cellLines &&
        cellLines.map(({ node: cellLine }) => (
          <div className="is-parent column is-6" key={cellLine.id}>
    
              <header>
                {/* {cellLine?.frontmatter?.featuredimage && (
                  <div className="featured-thumbnail">
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: cellLine.frontmatter.featuredimage,
                        alt: `featured image thumbnail for post ${cellLine.frontmatter.title}`,
                        width:
                          cellLine.frontmatter.featuredimage.childImageSharp
                            .gatsbyImageData.width,
                        height:
                          cellLine.frontmatter.featuredimage.childImageSharp
                            .gatsbyImageData.height,
                      }}
                    />
                  </div>
                ) } */}
                <p className="post-meta">
                  <Link
                    className="title has-text-primary is-size-4"
                    to={cellLine.fields.slug}
                  >
                    {cellLine.frontmatter.title}
                  </Link>
                  <span> &bull; </span>
                  <span className="subtitle is-size-5 is-block">
                    {cellLine.frontmatter.date}
                  </span>
                </p>
              </header>
              <p>
                {cellLine.excerpt}
                <br />
                <br />
                <Link className="button" to={cellLine.fields.slug}>
                  Keep Reading →
                </Link>
              </p>
          </div>
        ))}
    </div>
  )
}

CellLineTable.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default function CellLineTable() {
  return (
      <StaticQuery
          query={graphql`
              query CellLineTableQuery {
                  allMarkdownRemark(
                      filter: {
                          frontmatter: { templateKey: { eq: "cell-line" } }
                      }
                  ) {
                      edges {
                          node {
                              excerpt(pruneLength: 400)
                              id
                              fields {
                                  slug
                              }
                              frontmatter {
                                  templateKey
                              }
                          }
                      }
                  }
              }
          `}
          render={(data, count) => (
              <CellLineTableTemplate data={data} count={count} />
          )}
      />
  );
}
