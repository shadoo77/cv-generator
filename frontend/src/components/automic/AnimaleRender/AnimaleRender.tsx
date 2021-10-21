import React from 'react';
import { useAnimales } from '../../../contexts/animalesContext';

function AnimaleRender() {
  const {
    imageSrc, errorMessage, hasFailed, isLoading, hasSubmitted
  } = useAnimales();

  return (
    <div className="animale-render">
      {imageSrc && imageSrc.length && (
        <div className="animale-render-image">
          <img src={imageSrc} alt="animal-render" />
        </div>
      )}
      {!hasFailed && !isLoading && !hasSubmitted && (
        <div className="animale-render-not-submitted">
          Type something in the search and click on search.
        </div>
      )}
      {hasFailed && (
        <div className="animale-render-error">
          {errorMessage}
        </div>
      )}
      {hasSubmitted && !imageSrc && (
        <div className="animale-render-error">
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default AnimaleRender;
