import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";

// eslint-disable-next-line
export const DiseaseTemplate = ({
    name,
    gene
}) => {
    return (
        <section className="section">
            <div className="container content">
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <p>Name: {name}</p>
                        <p>Gene: {gene}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};


const Disease = ({ data }) => {
  const { markdownRemark: cellLine } = data;
  return (
      <Layout>
          <DiseaseTemplate
              name={cellLine.frontmatter.name}
              gene={`${cellLine.frontmatter.gene.frontmatter.symbol} - ${cellLine.frontmatter.gene.frontmatter.name}`}
          />
      </Layout>
  );
};


export default Disease;

export const pageQuery = graphql`
    query DiseaseByID($id: String!) {
        markdownRemark(id: { eq: $id }) {
            id
            frontmatter {
                name
                gene {
                    frontmatter {
                        symbol
                        name
                    }
                }
            }
        }
    }
`;
