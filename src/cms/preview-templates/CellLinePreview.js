import React from 'react'
import PropTypes from 'prop-types'
import { CellLineTemplate } from '../../templates/cell-line'

const CellLinePreview = ({ entry, widgetFor }) => {
  return (
      <CellLineTemplate
          description={entry.getIn(["data", "description"])}
          title={entry.getIn(["data", "title"])}
      />
  );
}

CellLinePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default CellLinePreview
