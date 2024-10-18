import React from "react";
import { graphql, Link } from "gatsby";
import { Flex } from "antd";

import Layout from "../components/Layout";
import {
  Clone,
  DiseaseCellLineFrontmatter,
  GeneFrontMatter,
  ParentalLineFrontmatter,
} from "../component-queries/types";
import { DefaultButton } from "../components/shared/Buttons";
import ImagesAndVideos from "../components/ImagesAndVideos";
import CellLineInfoCard from "../components/CellLineInfoCard";

const Arrow = require("../img/arrow.svg");

interface DiseaseCellLineTemplateProps {
  href: string;
  cellLineId: string;
  geneName: string;
  geneSymbol: string;
  status: string;
  snp: string;
  orderLink: string;
  certificateOfAnalysis: string;
  parentalLine: ParentalLineFrontmatter;
  parentLineGene: GeneFrontMatter;
  clones: Clone[];
  healthCertificate: string;
  imagesAndVideos: any;
}

// eslint-disable-next-line
export const DiseaseCellLineTemplate = ({
  href,
  cellLineId,
  parentLineGene,
  geneName,
  geneSymbol,
  clones,
  snp,
  orderLink,
  certificateOfAnalysis,
  parentalLine,
  healthCertificate,
  imagesAndVideos,
}: DiseaseCellLineTemplateProps) => {
  return (
    <Flex gap={40} justify="space-between">
      <Flex
        vertical
        gap={16}
        style={{ maxWidth: 505, width: "40%", minWidth: 460 }}
      >
        <Link to="/disease-catalog">
          <DefaultButton>
            <Arrow style={{ marginRight: 8 }} />
            Return to Cell Catalog
          </DefaultButton>
        </Link>
        <CellLineInfoCard
          href={href}
          cellLineId={cellLineId}
          parentLineGene={parentLineGene}
          geneName={geneName}
          geneSymbol={geneSymbol}
          clones={clones}
          snp={snp}
          orderLink={orderLink}
          certificateOfAnalysis={certificateOfAnalysis}
          parentalLine={parentalLine}
          healthCertificate={healthCertificate}
        />
      </Flex>
      <ImagesAndVideos
        cellLineId={cellLineId}
        parentalLine={parentalLine}
        geneSymbol={geneSymbol}
        snp={snp}
        images={imagesAndVideos?.images || []}
      />
    </Flex>
  );
};

const CellLine = ({ data, location }: QueryResult) => {
  const { markdownRemark: cellLine } = data;
  const parentalLineData = cellLine.frontmatter.parental_line.frontmatter;
  const { name: geneName, symbol: geneSymbol } =
    cellLine.frontmatter.disease.frontmatter.gene.frontmatter;
  return (
    <Layout>
      <DiseaseCellLineTemplate
        href={location.href || ""}
        cellLineId={cellLine.frontmatter.cell_line_id}
        snp={cellLine.frontmatter.snp}
        orderLink={cellLine.frontmatter.order_link}
        certificateOfAnalysis={cellLine.frontmatter.certificate_of_analysis}
        geneName={geneName}
        geneSymbol={geneSymbol}
        parentalLine={parentalLineData}
        status={cellLine.frontmatter.status}
        parentLineGene={parentalLineData.gene.frontmatter}
        clones={cellLine.frontmatter.clones}
        healthCertificate={cellLine.frontmatter.hPSCreg_certificate_link}
        imagesAndVideos={cellLine.frontmatter.images_and_videos}
      />
    </Layout>
  );
};

interface QueryResult {
  location: Location;
  data: {
    markdownRemark: { frontmatter: DiseaseCellLineFrontmatter };
  };
}

export default CellLine;

export const pageQuery = graphql`
  query DiseaseCellLineByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        cell_line_id
        parental_line {
          frontmatter {
            cell_line_id
            clone_number
            tag_location
            fluorescent_tag
            thumbnail_image {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED, layout: FIXED)
              }
            }
            gene {
              frontmatter {
                symbol
                name
              }
            }
          }
        }
        disease {
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
        snp
        clones {
          type
        }
        certificate_of_analysis
        order_link
        images_and_videos {
          images {
            image {
              childImageSharp {
                gatsbyImageData(
                  placeholder: BLURRED
                  layout: CONSTRAINED
                  width: 549
                )
              }
            }
            caption
          }
        }
      }
    }
  }
`;
