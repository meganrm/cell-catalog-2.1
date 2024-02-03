import React from 'react'
import PropTypes from 'prop-types'
import { GeneNameTemplate } from '../../templates/gene-name'

const GeneNamePreview = ({ entry, widgetFor }) => {
  return (
      <GeneNameTemplate
          symbol={entry.getIn(["data", "gene_symbol"])}
          name={entry.getIn(["data", "gene_name"])}
          protein={entry.getIn(["data", "protein"])}
      />
  );
}

CellLinePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default GeneNamePreview;
