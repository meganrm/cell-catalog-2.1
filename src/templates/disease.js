import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";

// eslint-disable-next-line
export const DiseaseTemplate = ({
    name,
    baseCellLine
}) => {
    return (
        <section className="section">
            <div className="container content">
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <p>Name: {name}</p>
                        <p>Base cell line: AICS-{baseCellLine}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

DiseaseTemplate.propTypes = {
    name: PropTypes.string,
    baseCellLine: PropTypes.number,
};

const Disease = ({ data }) => {
  const { markdownRemark: cellLine } = data;
  return (
      <Layout>
          <DiseaseTemplate
              name={cellLine.frontmatter.name}
              baseCellLine={cellLine.frontmatter.base_cell_line}
          />
      </Layout>
  );
};

Disease.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default Disease;

export const pageQuery = graphql`
    query CellLinePostByID($id: String!) {
        markdownRemark(id: { eq: $id }) {
            id
            frontmatter {
                name
                base_cell_line
            }
        }
    }
`;
