import React from "react";
import { Flex, Tag } from "antd";
import { UnpackedGene } from "../component-queries/types";

interface GeneDisplayProps {
    gene: UnpackedGene;
}

const GeneDisplay: React.FC<GeneDisplayProps> = ({ gene }) => {
    return (
        <Flex wrap="wrap">
            <Tag bordered={false} color="#DFE5EA">
                {gene.symbol}
            </Tag>
            <div>{gene.name}</div>
        </Flex>
    );
};

export default GeneDisplay;
