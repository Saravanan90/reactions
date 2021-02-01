import PropTypes from 'prop-types';

export const LoaderWrapper = ({dataset = [], content}) => {
  const isDataLoaded = dataset && dataset.length > 0 && (dataset.find(data => !data) === undefined)
  return (
    <>
      {isDataLoaded ? content : <div className='spinner'></div>}
    </>
  )
}

LoaderWrapper.propTypes = {
  dataset: PropTypes.array
}