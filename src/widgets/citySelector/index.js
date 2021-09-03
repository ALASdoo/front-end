import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import dataProvider from '../../dataProvider';
import i18n from '../../i18n';

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
    <div className='select-city'>
      {!city && <div className='warning'>{i18n.t('selectCity')}</div>}
      <select onChange={handleSelection} value={city}>
        <option key='' value='' disabled>{i18n.t('selectCity')}</option>
        {cities.map((c) => {
          return (
            <option key={c} value={c}>
              {c}
            </option>
          );
        })}
      </select>
    </div>
  );
}

CitySelector.propTypes = propTypes;
