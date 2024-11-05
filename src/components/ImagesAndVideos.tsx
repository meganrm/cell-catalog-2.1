import { Card, Flex } from "antd";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import React, { useState } from "react";
import { ParentalLineFrontmatter } from "../component-queries/types";
import { formatCellLineId } from "../utils";
const {
    container,
    header,
    titleSection,
    mainTitle,
    subtitle,
    rightTitle,
    imageSection,
    caption,
    imageContainer,
    mainImageContainer,
    thumbnailContainer,
    primaryImageOnly,
    primaryImageWithThumbnail,
} = require("../style/images-and-videos.module.css");

interface ImagesAndVideosProps {
    images?: any[];
    cellLineId: string;
    parentalLine: ParentalLineFrontmatter;
    videos?: any;
    geneSymbol: string;
    snp: string;
}

const ImagesAndVideos: React.FC<ImagesAndVideosProps> = ({
    images = [],
    cellLineId,
    parentalLine,
    geneSymbol,
}) => {
    const [mainImage, setMainImage] = useState(images[0]);
    const thumbnails = images.map((image) => {
        const renderImage = getImage(image.image);
        if (renderImage) {
            return (
                <div onClick={() => setMainImage(image)}>
                    <GatsbyImage
                        image={renderImage}
                        alt="thumbnail image"
                    ></GatsbyImage>
                </div>
            );
        }
    });
    const hasMultipleImages = images.length > 1;
    const primaryImageClassName = hasMultipleImages
        ? primaryImageWithThumbnail
        : primaryImageOnly;

    const imageData = mainImage ? getImage(mainImage.image) : null;
    const fluorescentTag = parentalLine.fluorescent_tag;
    const parentalGeneSymbol = parentalLine.gene.frontmatter.symbol;
    const alleleTag = parentalLine.allele_count;
    const title = (
        <Flex
            justify="space-between"
            style={{ paddingTop: 24 }}
            className={header}
        >
            <div className={titleSection}>
                <h3 className={mainTitle}>{formatCellLineId(cellLineId)}</h3>
                <span className={subtitle}>
                    {geneSymbol}-(placeholder) in WTC-{fluorescentTag}-
                    {parentalGeneSymbol}({alleleTag}-allelic tag)
                </span>
            </div>
            <span className={rightTitle}>
                Representative images for all clones
            </span>
        </Flex>
    );

    return (
        <Card className={container} title={title} style={{ width: "100%" }}>
            <Flex
                vertical
                justify="space-between"
                align="center"
                className={imageSection}
            >
                {imageData && (
                    <div className={imageContainer}>
                        <div className={mainImageContainer}>
                            <GatsbyImage
                                className={primaryImageClassName}
                                image={imageData}
                                alt="main image"
                            ></GatsbyImage>
                            {mainImage?.caption && (
                                <p className={caption}>{mainImage.caption}</p>
                            )}
                        </div>
                        {hasMultipleImages && (
                            <div className={thumbnailContainer}>
                                {thumbnails}
                            </div>
                        )}
                    </div>
                )}
            </Flex>
        </Card>
    );
};

export default ImagesAndVideos;
