import React, { useState } from "react";
import { Card, Flex } from "antd";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import { ParentalLineFrontmatter } from "../component-queries/types";
import { formatCellLineId } from "../utils";
import Thumbnail from "./Thumbnail";

const {
    container,
    header,
    titleSection,
    mainTitle,
    subtitle,
    rightTitle,
    caption,
    thumbnailContainer,
    primaryImageOnly,
    primaryImageWithThumbnail,
    primaryImageContainer,
} = require("../style/images-and-videos.module.css");

interface ImagesAndVideosProps {
    images?: any[];
    cellLineId: string;
    parentalLine: ParentalLineFrontmatter;
    videos?: any;
    geneSymbol: string;
    snp: string;
    fluorescentTag: string;
    parentalGeneSymbol: string;
    alleleTag: string;
}

const ImagesAndVideos: React.FC<ImagesAndVideosProps> = ({
    images = [],
    cellLineId,
    fluorescentTag,
    parentalGeneSymbol,
    alleleTag,
    geneSymbol,
}) => {
    const [mainImage, setMainImage] = useState(images?.[0] || null);
    const hasMultipleImages = images?.length > 1;
    const thumbnails = images?.map((image) => {
        const renderImage = getImage(image?.image);
        if (renderImage) {
            return (
                <Thumbnail
                    key={image.id}
                    image={renderImage}
                    isSelected={mainImage === image}
                    onClick={() => setMainImage(image)}
                />
            );
        }
    });
    const primaryImageClassName = hasMultipleImages
        ? primaryImageWithThumbnail
        : primaryImageOnly;

    const imageData = getImage(mainImage.image);
    if (!imageData) {
        return null;
    }

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
        <Card className={container} title={title}>
            <Flex
                className={primaryImageContainer}
                align="center"
                vertical
                justify="center"
                gap={8}
            >
                <GatsbyImage
                    className={primaryImageClassName}
                    image={imageData}
                    alt="main image"
                    imgStyle={{ objectFit: "contain" }}
                />
                {mainImage.caption && (
                    <p className={caption}>{mainImage.caption}</p>
                )}
            </Flex>
            {hasMultipleImages && (
                <Flex
                    vertical
                    style={{ minHeight: 0 }}
                    className={thumbnailContainer}
                >
                    {thumbnails}
                </Flex>
            )}
        </Card>
    );
};

export default ImagesAndVideos;
