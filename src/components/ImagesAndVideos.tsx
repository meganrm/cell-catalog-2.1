import { Card } from 'antd';
import { getImage, GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import { GeneFrontMatter } from '../component-queries/types';
import { formatCellLineId } from '../utils';

interface ImagesAndVideosProps {
    images: any;
    cellLineId: string;
    parentLineGene: GeneFrontMatter;
    videos?: any;
}

const ImagesAndVideos: React.FC<ImagesAndVideosProps> = ({ images, cellLineId }) => {
    const mainImage = images[0];
    const imageData = getImage(mainImage.image);
    const title = (
        <>
            <h3>{formatCellLineId(cellLineId)}</h3>
            <span>here is the subtitle</span>
        </>
    )

    return (
        <div>
            <Card
                title={title}
                style={{ width: "100%" }}
            >
                {imageData && <GatsbyImage image={imageData} alt='main image'></GatsbyImage>}
                <p>{mainImage.caption}</p>
            </Card>
        </div>
    );
};

export default ImagesAndVideos;