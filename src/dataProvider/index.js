import { negate, isUndefined } from 'lodash';
import { BehaviorSubject, combineLatest, map, filter } from 'rxjs';
import csv from '../../data/city-populations-to-2035.csv';

const loading = new BehaviorSubject(true);
const data = new BehaviorSubject([]);
const selectedCity = new BehaviorSubject('');
const cities = new BehaviorSubject([]);

(async function init() {
  setTimeout(() => {
    loading.next(false);
    data.next(csv);
    getCities();
  }, 3000); // Simulate network request
})();

const populationForSelectedCity = combineLatest([
  data.pipe(filter(negate(isUndefined))),
  selectedCity,
]).pipe(
  map(([data, selectedCity]) => {
    return data.filter(({ city }) => city === selectedCity);
  })
);

const getCities = function(){
  data.subscribe(readCSV => {
    cities.next(Array.from(new Set(readCSV.map(line => line.city))));
  })
}

export default {
  loadingStream: loading,
  dataStream: data,
  selectedCityStream: selectedCity,
  populationForSelectedCity,
  citiesStream: cities
};
