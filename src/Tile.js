import React from 'react';
import { getSprite } from 'pokemon-images';
import { Card } from 'antd';

function Tile({ name }) {
  return(
    <Card title={name} style={{ width: 300 }}>
      <img src={getSprite(name)} alt={name}/>
    </Card>
  );
}
Tile.propTypes = {
  name: React.PropTypes.string,
}

Tile.defaultProps = {
  name: "Mew",
}

export default Tile;
