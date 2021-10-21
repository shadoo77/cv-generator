import React from 'react';
import Search from '../automic/Search';
import AnimaleRender from '../automic/AnimaleRender';
import Constants from '../../constants/constants';

function Cat() {
  return (
    <div>
      <div className="page-title">
        <h2>Cat page</h2>
      </div>
      <Search animaleKind={Constants.ANIMALE_TYPE.CAT} selectedItems={Constants.CAT_LIST} />
      <AnimaleRender />
    </div>
  );
}

export default Cat;
