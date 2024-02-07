import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";

// eslint-disable-next-line
export const GeneNameTemplate = ({
  name, 
  symbol,
  protein,
}) => {

  return (
      <section className="section">
          <div className="container content">
              <div className="columns">
                  <div className="column is-10 is-offset-1">
                      <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                          {name}
                      </h1>
                      <p>{symbol}</p>
                      <p>{protein}</p>
                  </div>
              </div>
          </div>
      </section>
  );
};

GeneNameTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};

const GeneName = ({ data }) => {
  const { markdownRemark: geneData } = data;

  return (
      <Layout>
          <GeneNameTemplate
              protein={geneData.frontmatter.protein}
              symbol={geneData.frontmatter.symbol}
              name={geneData.frontmatter.name}
          />
      </Layout>
  );
};

GeneName.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default GeneName;

export const pageQuery = graphql`
    query GeneNameById($id: String!) {
        markdownRemark(id: { eq: $id }) {
            id
            frontmatter {
                gene_name
                gene_symbol
                protein
            }

        }
    }
`;
