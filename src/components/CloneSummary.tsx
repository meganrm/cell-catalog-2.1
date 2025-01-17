import { Flex } from "antd";
import React from "react";
const { cloneNumber } = require("../style/table.module.css");

interface CloneSummaryProps {
    numMutants: number;
    numIsogenics: number;
    index: number;
}

const CloneSummary: React.FC<CloneSummaryProps> = ({
    numMutants,
    numIsogenics,
    index,
}) => (
    <Flex vertical={true} key={index}>
        <div>
            <span className={cloneNumber} key={numMutants}>
                {numMutants}
            </span>
            <span> mutant clones</span>
        </div>
        <div>
            <span className={cloneNumber} key={numIsogenics}>
                {numIsogenics}
            </span>
            <span> isogenic controls</span>
        </div>
    </Flex>
);

export default CloneSummary;
