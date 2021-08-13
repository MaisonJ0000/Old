import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

const Search = (opts) => {
  const {
    id = null,
    className,
    placeholder,
    options = [],
    valueOpt,
    onChange,
    style = {},
    onChangeTextField,
    onHighlightChange,
    onClose,
    loading: loadingOpt,
    renderOption,
    showsEndAdornment = false,
  } = opts || {};

  const [open, setOpen] = React.useState(false);
  const loading = open && loadingOpt;

  return (
    <Autocomplete
      id={id}
      className={className}
      style={style}
      open={open}
      onOpen={() => { setOpen(true); }}
      onClose={() => { onClose(); setOpen(false); }}
      onHighlightChange={onHighlightChange}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      value={valueOpt}
      onChange={onChange}
      loading={loading}
      renderOption={renderOption}
      renderInput={(params) => (
        <TextField
          {...params}
          label={placeholder}
          variant="outlined"
          onChange={onChangeTextField}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {showsEndAdornment ? params.InputProps.endAdornment : null}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default React.memo(Search);
