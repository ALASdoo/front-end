import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import dataProvider from '../../dataProvider';

const propTypes = {
  city: PropTypes.string,
  handleSelection: PropTypes.func.isRequired,
  cities: PropTypes.array
};

export default function CitySelector({ city, handleSelection }) {
  const [cities, setCities] = React.useState([]);

  useEffect(() => {
    const subscription = dataProvider.citiesStream.subscribe(setCities);
    return () => subscription.unsubscribe();
  }, []);

  return (
    <select onChange={handleSelection} value={city}>
      {cities.map((c) => {
        return (
          <option key={c} value={c}>
            {c}
          </option>
        );
      })}
    </select>
  );
}

CitySelector.propTypes = propTypes;
