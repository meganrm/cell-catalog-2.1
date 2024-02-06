import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";

// eslint-disable-next-line
export const CellLineTemplate = ({
    cellLineId,
    cloneNumber,
    gene,
    terminalTagged,
    status,
}) => {
    return (
        <section className="section">
            <div className="container content">
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                            AICS-{cellLineId}
                        </h1>
                        <p>Clone Number: {cloneNumber}</p>
                        <p>Gene: {gene}</p>
                        <p>Tag: {terminalTagged}</p>
                        <p>Status: {status}</p>
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
    terminalTagged: PropTypes.string,
    status: PropTypes.string,
};

const CellLine = ({ data }) => {
  const { markdownRemark: cellLine } = data;
  console.log(data)
  return (
    <Layout>
      <CellLineTemplate
        cellLineId={cellLine.frontmatter.cell_line_id}
        cloneNumber={cellLine.frontmatter.clone_number}
        gene={cellLine.frontmatter.gene}
        terminalTagged={cellLine.frontmatter.terminal_tagged}
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
  query CellLinePostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        cell_line_id
        clone_number
        gene
        terminal_tagged
        status
      }
    }
  }
`;
