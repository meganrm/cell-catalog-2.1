import { Card } from "antd";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import { GeneFrontMatter } from "../component-queries/types";
import { formatCellLineId } from "../utils";
const {
    titleSection,
    container,
    mainTitle,
    subTitle,
    leftTitle,
    rightTitle,
    imageSection,
    caption,
} = require("../style/images-and-videos.module.css");

interface ImagesAndVideosProps {
    images: any;
    cellLineId: string;
    parentLineGene: GeneFrontMatter;
    videos?: any;
}

const ImagesAndVideos: React.FC<ImagesAndVideosProps> = ({
    images,
    cellLineId,
}) => {
    const mainImage = images[0];
    const imageData = getImage(mainImage.image);
    const title = (
        <div className={titleSection}>
            <div className={leftTitle}>
                <h3 className={mainTitle}>{formatCellLineId(cellLineId)}</h3>
                <span className={subTitle}>here is the subtitle</span>
            </div>
            <span className={rightTitle}>Representative images for all clones</span>
        </div>
    );

    return (
        <div>
            <Card className={container} title={title} style={{ width: "100%" }}>
                <div className={imageSection}>
                    {imageData && (
                        <GatsbyImage image={imageData} alt="main image"></GatsbyImage>
                    )}
                </div>
                <p className={caption}>{mainImage.caption}</p>
            </Card>
        </div>
    );
};

export default ImagesAndVideos;
