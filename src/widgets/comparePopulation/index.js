import React from 'react';
import dataProvider from '../../dataProvider';
import { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import i18n from '../../i18n';
import { map } from 'rxjs';

const getPopulationByCity = function(data, city) {
  return data.filter(line => ( line.city === city && line.population))
    .map(line => [line.year, line.population])
}

export default function ComparePop() {
  const [loading, setLoading] = React.useState();
  const [selectedCity, setSelectedCity] = React.useState();
  const [comparisonCity, setComparisonCity] = React.useState();
  const [chartOptions, setChartOptions] = React.useState();

  useEffect(() => {
    const subscription = dataProvider.loadingStream.subscribe(setLoading);
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const subscription = dataProvider.selectedCityStream.subscribe(setSelectedCity);
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const subscription = dataProvider.comparisonCityStream.subscribe(setComparisonCity);
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const subscription = dataProvider.populationForCityComparison
      .pipe(
        map((data) => {
          const cities = Array.from(new Set(data.map(line => line.city)))

          if (cities.length === 1) {    // if the comparison city is the same as the selected, duplicate it in the array
            cities.push(cities[0])
          }

          return {
            chart: {
              type: 'column',
            },
            title: {
              text: i18n.t('compareTitle', {city1: cities[0], city2: cities[1]}),
            },
            series: [
              {
                name: cities[0],
                data: getPopulationByCity(data, cities[0]),
              },
              {
                name: cities[1],
                data: getPopulationByCity(data, cities[1]),
              },
            ],
          };
        })
      )
      .subscribe(setChartOptions);
    return () => subscription.unsubscribe();
  }, []);

  return <div>
    {!loading && comparisonCity && selectedCity && <HighchartsReact highcharts={Highcharts} options={chartOptions} />}
  </div>;
}
