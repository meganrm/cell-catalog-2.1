import { filter } from "lodash";
import { Clone } from "../component-queries/types";

export const formatCellLineId = (cellLineId: string | number) => {
    const zeros = "0000";
    return `AICS-${
        zeros.slice(0, zeros.length - cellLineId.toString().length) + cellLineId
    }`;
};

export const getCloneSummary = (clones: Clone[]) => {
    const numMutants = filter(clones, { type: "Mutant" }).length;
    const numIsogenics = clones.length - numMutants;
    return {
        numMutants,
        numIsogenics,
    };
};
