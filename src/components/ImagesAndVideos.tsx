import { Card, Flex } from "antd";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import { GeneFrontMatter } from "../component-queries/types";
import { formatCellLineId } from "../utils";
const {
    container,
    titleSection,
    mainTitle,
    subtitle,
    rightTitle,
    imageSection,
    caption,
} = require("../style/images-and-videos.module.css");

interface ImagesAndVideosProps {
    images: any;
    cellLineId: string;
    parentLineGene: GeneFrontMatter;
    videos?: any;
    geneName: string;
    geneSymbol: string;
}

const ImagesAndVideos: React.FC<ImagesAndVideosProps> = ({
    images,
    cellLineId,
    parentLineGene,
    geneName,
    geneSymbol,
}) => {
    const mainImage = images[0];
    const imageData = getImage(mainImage.image);
    const subtitleData = parentLineGene;
    const title = (
        <Flex
            justify="space-between"
            style={{ paddingTop: 24 }}
            className={titleSection}
        >
            <div>
                <h3 id={mainTitle}>{formatCellLineId(cellLineId)}</h3>
                <span className={subtitle}>
                    {geneName} ({geneSymbol}) - {subtitleData.name}
                </span>
            </div>
            <span className={rightTitle}>Representative images for all clones</span>
        </Flex>
    );

    return (
        <Card className={container} title={title} style={{ width: "100%" }}>
            <Flex vertical justify="center" align="center">
                {imageData && (
                    <GatsbyImage
                        image={imageData}
                        alt="main image"
                        className={imageSection}
                    ></GatsbyImage>
                )}
                <p className={caption}>{mainImage.caption}</p>
            </Flex>
        </Card>
    );
};

export default ImagesAndVideos;
