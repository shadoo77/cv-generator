import React from 'react';
import Search from '../automic/Search';
import AnimaleRender from '../automic/AnimaleRender';
import { CONSTANTS } from '../../constants/constants';

function Cat() {
  return (
    <div>
      <div className="page-title">
        <h2>Cat page</h2>
      </div>
      <Search animaleKind={CONSTANTS.ANIMALE_TYPE.CAT} selectedItems={CONSTANTS.CAT_LIST} />
      <AnimaleRender />
    </div>
  );
}

export default Cat;
