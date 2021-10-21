import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  TextField, InputAdornment, Button, InputLabel, RadioGroup,
  Radio, MenuItem, FormHelperText, FormControl, Select,
  FormLabel, FormControlLabel, SelectChangeEvent, CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAnimales } from '../../../contexts/animalesContext';
import { isEmpty } from '../../../utils/utilitiesFunctions';
import animaleService from '../../../services/animaleService';
import Constants from '../../../constants/constants';

interface ISearchProps {
  animaleKind: string,
  selectedItems: string[],
}

function Search({ animaleKind, selectedItems }: ISearchProps) {
  const {
    stateUpdater, resetState, isLoading
  } = useAnimales();
  const [selected, setSelected] = useState('');
  const [checked, setChecked] = useState('type');
  const [seachTerm, setSearchTerm] = useState('');
  const [errors, setErrors] = useState<any>({});

  // Choose fetch method based on the animale
  const fetchFunction = animaleKind === Constants.ANIMALE_TYPE.DOG
    ? animaleService.fetchDogsBySearchTerm
    : animaleService.fetchCatsBySearchTerm;

  // When we launch on dog or cat page we need to reset state
  useEffect(() => {
    resetState();
  }, [resetState]);

  const handleChangeSearchTerm = (event: React.ChangeEvent<{ value: string, name: string }>) => {
    setSearchTerm(event.target.value);
    setErrors({
      ...errors,
      seachTerm: null
    });
  };

  const handleSelect = (event: SelectChangeEvent<string>) => {
    setSelected(event.target.value);
    setErrors({
      ...errors,
      selected: null
    });
  };

  const handleChecked = (event: any) => {
    setChecked(event.target.value);
  };

  const getErrorBySearchType = () => {
    const searchType = checked === 'type' ? 'seachTerm' : 'selected';
    return {
      [searchType]: checked === 'type'
        ? 'Invalid search term, it musr be minimum 3 charachters'
        : 'Select item please'
    };
  };

  const validateInput = () => {
    const validate = {
      query: checked === 'type' ? seachTerm : selected,
      isValid: false
    };
    if (!isEmpty(validate.query) && validate.query.length > 2) {
      validate.isValid = true;
    }
    setErrors({});
    return validate;
  };

  const getDataByAnimaleKind = (data: any) => {
    let imageSrc;
    let errorMessage = '';
    if (animaleKind === Constants.ANIMALE_TYPE.DOG) {
      imageSrc = (data && data.message) || '';
    } else if (!data.length) {
      imageSrc = '';
      errorMessage = 'There is no results match your search term, try something else!';
    } else {
      imageSrc = `https://cdn2.thecatapi.com/images/${data[0].reference_image_id}.jpg`;
    }
    stateUpdater({
      imageSrc,
      errorMessage,
      isLoading: false,
      hasFailed: false,
      hasSubmitted: true
    });
  };

  // eslint-disable-next-line consistent-return
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      stateUpdater({ isLoading: true });
      const { isValid, query } = validateInput();
      if (!isValid) {
        setErrors(getErrorBySearchType());
        stateUpdater({ isLoading: false });
        return false;
      }
      const data = await fetchFunction(query);
      getDataByAnimaleKind(data);
    } catch (err: any) {
      console.error('Unexpected error by submitting', err);
      let errorMessage;
      if (err.response && err.response.data && err.response.data.code === 404) {
        errorMessage = 'There is no results match your search term, try something else!';
      } else {
        errorMessage = 'Unexpected error occured by submitting, please try again!';
      }
      stateUpdater({
        imageSrc: '',
        isLoading: false,
        hasFailed: true,
        errorMessage
      });
    }
  };

  return (
    <div className="search">
      <FormControl component="fieldset">
        <FormLabel component="legend">Choose one of the next search options</FormLabel>
        <RadioGroup
          row-aria-label="gender"
          name="checked"
          value={checked}
          onChange={handleChecked}
        >
          <div className="search-options">
            <div className="search-options-box">
              <div className="search-options-radio-group">
                <FormControlLabel
                  value="type"
                  control={
                    <Radio
                      inputProps={{
                        id: 'radio-button-for-search-box'
                      }}
                    />
                  }
                  label="Type"
                />
                <TextField
                  name="seachTerm"
                  disabled={checked === 'select'}
                  fullWidth
                  id="fullWidth"
                  placeholder="Search here for an animale"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon style={{ color: 'grey' }} />
                      </InputAdornment>
                    ),
                    autoCapitalize: 'none'
                  }}
                  error={!!errors.seachTerm}
                  helperText={errors.seachTerm}
                  onChange={handleChangeSearchTerm}
                />
              </div>
            </div>
            <div className="search-options-select">
              <div className="search-options-radio-group">
                <FormControlLabel
                  value="select"
                  control={
                    <Radio
                      inputProps={{
                        id: 'radio-button-for-select'
                      }}
                    />
                  }
                  label="Select"
                />
                <FormControl sx={{ m: 1, minWidth: 120 }} error={!!errors.selected}>
                  <InputLabel id="demo-simple-select-helper-label">Variants</InputLabel>
                  <Select
                    name="selected"
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={selected}
                    label="Variants"
                    onChange={handleSelect}
                    disabled={checked === 'type'}
                    inputProps={{
                      id: 'select-animale-dropdown'
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {selectedItems && selectedItems.length
                      && selectedItems.map((item) => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                      ))}
                  </Select>
                  {errors.selected && <FormHelperText>{errors.selected}</FormHelperText>}
                </FormControl>
              </div>
            </div>
          </div>
        </RadioGroup>
      </FormControl>
      <div className="submit-button-wrapper">
        <Button
          size="large"
          variant="contained"
          onClick={handleSubmit}
          fullWidth
          disabled={isLoading}
        >
          Search
        </Button>
        {isLoading && <CircularProgress size={24} className="submit-button-wrapper-progress" />}
      </div>
    </div>
  );
}

Search.propTypes = {
  animaleKind: PropTypes.string.isRequired,
  selectedItems: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.array]).isRequired
};

export default Search;
