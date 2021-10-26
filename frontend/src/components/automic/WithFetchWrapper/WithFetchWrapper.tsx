import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Typography, CircularProgress, Box
} from '@mui/material';
import { isEmpty } from '../../../utils/utilitiesFunctions';

interface IWithFetchWrapperState {
  isLoading: boolean;
  hasFailed: boolean;
  errorMessage: string;
  data: any[];
}

interface IWithFetchWrapperProps {
  children: Record<string, unknown> | Record<string, unknown>[];
  state: IWithFetchWrapperState;
}

interface IFailedProps {
  errorMessage: string;
}

// Spinner
const Spinner = () => (
  <Box display="flex" justifyContent="center" alignItems="center" m={3}>
    <CircularProgress />
  </Box>
);

// Failed message
const Failed = ({ errorMessage }: IFailedProps) => (
  <Paper>
    <Box display="flex" justifyContent="center" alignItems="center" m={3}>
      <Typography variant="h5" component="h3">
        {errorMessage}
      </Typography>
    </Box>
  </Paper>
);

function WithFetchWrapper(props: IWithFetchWrapperProps) {
  const {
    isLoading, hasFailed, errorMessage, data
  } = props.state;

  if (isLoading && !hasFailed) {
    return <Spinner />;
  }

  if (!isLoading && hasFailed) {
    return <Failed errorMessage={errorMessage} />;
  }

  if (!hasFailed && !isLoading && isEmpty(data)) {
    return <Failed errorMessage="No template found!" />;
  }

  return (
    <>
      {props.children}
    </>
  );
}

WithFetchWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.array]).isRequired,
  state: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.array]).isRequired
};

export default WithFetchWrapper;
