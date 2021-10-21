import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import PetsIcon from '@mui/icons-material/Pets';

export default () => {
  const history = useHistory();

  const handleNavigate = (subDir: string) => {
    history.push(`/${subDir}`);
  };

  return (
    <div className="home">
      <div className="home-buttons">
        <Button
          size="large"
          variant="contained"
          startIcon={<PetsIcon />}
          onClick={() => handleNavigate('dog')}
        >
          Dog
        </Button>
        <Button
          size="large"
          variant="outlined"
          startIcon={<CatchingPokemonIcon />}
          onClick={() => handleNavigate('cat')}
        >
          Cat
        </Button>
      </div>
    </div>
  );
};
