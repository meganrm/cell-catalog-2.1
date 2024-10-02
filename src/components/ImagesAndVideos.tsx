import { Card } from 'antd';
import { getImage, GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';

interface ImagesAndVideosProps {
    images: any;
    videos?: any;
}

const ImagesAndVideos: React.FC<ImagesAndVideosProps> = ({ images }) => {
    return (
        <div>
            <h2>Images</h2>
            {images.map((img:any, index:number) => {
                    const image = getImage(img.image.childImageSharp.gatsbyImageData);
            return (
                <Card key={index} style={{ width: "100%" }}>
                    {image && <GatsbyImage image={image} alt={img.caption}></GatsbyImage>}
                    <p>{img.caption}</p>
                </Card>
            );
})}
        </div>
    );
};

export default ImagesAndVideos;