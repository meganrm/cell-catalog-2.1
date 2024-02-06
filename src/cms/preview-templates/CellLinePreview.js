import React from 'react'
import PropTypes from 'prop-types'
import { CellLineTemplate } from '../../templates/cell-line'

const CellLinePreview = ({ entry, widgetFor }) => {
  return (
      <CellLineTemplate
          cellLineId={entry.getIn(["data", "cell_line_id"])}
          cloneNumber={entry.getIn(["data", "clone_number"])}
          gene={entry.getIn(["data", "gene"])}
          terminalTagged={entry.getIn(["data", "terminal_tagged"])}
          status={entry.getIn(["data", "status"])}
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
