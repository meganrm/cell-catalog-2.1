import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";

// eslint-disable-next-line
export const CellLineTemplate = ({
    cellLineId,
    gene,
}) => {
    return (
        <section className="section">
            <div className="container content">
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                            AICS-{cellLineId}
                        </h1>
                        <p>Gene: {gene}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

CellLineTemplate.propTypes = {
    cellLineId: PropTypes.string,
    cloneNumber: PropTypes.number,
    gene: PropTypes.string,
    tagLocation: PropTypes.string,
    status: PropTypes.string,
};

const CellLine = ({ data }) => {
  const { markdownRemark: cellLine } = data;
  return (
      <Layout>
          <CellLineTemplate
              cellLineId={cellLine.frontmatter.cell_line_id}
              cloneNumber={cellLine.frontmatter.clone_number}
              gene={cellLine.frontmatter.gene}
              tagLocation={cellLine.frontmatter.tag_location}
              status={cellLine.frontmatter.status}
          />
      </Layout>
  );
};

CellLine.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default CellLine;

export const pageQuery = graphql`
    query DiseaseCellLineByID($id: String!) {
        markdownRemark(id: { eq: $id }) {
            id
            frontmatter {
                cell_line_id
            }
        }
    }
`;
