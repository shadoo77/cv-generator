import React from 'react';
import Search from '../automic/Search';
import AnimaleRender from '../automic/AnimaleRender';
import Constants from '../../constants/constants';

function Dog() {
  return (
    <div>
      <div className="page-title">
        <h2>Dog page</h2>
      </div>
      <Search animaleKind={Constants.ANIMALE_TYPE.DOG} selectedItems={Constants.DOG_LIST} />
      <AnimaleRender />
    </div>
  );
}

export default Dog;
