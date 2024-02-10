import React from 'react'
import PropTypes from 'prop-types'
import { GeneNameTemplate } from '../../templates/gene-name'

const GeneNamePreview = ({ entry, widgetFor }) => {
  return (
      <GeneNameTemplate
          symbol={entry.getIn(["data", "symbol"])}
          name={entry.getIn(["data", "name"])}
          protein={entry.getIn(["data", "protein"])}
      />
  );
}

GeneNameTemplate.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
    widgetFor: PropTypes.func,
};

export default GeneNamePreview;
