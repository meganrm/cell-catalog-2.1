export const formatCellLineId = (cellLineId: string) => {
    const zeros = "0000";
    return `AICS-${zeros.slice(0, zeros.length - cellLineId.toString().length) + cellLineId}`;
}
