import i18n from './i18n';
import i18next from 'i18next';
import renderLanguageSelector from './widgets/languageSelector';
import React from 'react';
import ReactDOM from 'react-dom';
import Chart from './widgets/chart';
import CitySelector from './widgets/citySelector';
import ComparePopulation from './widgets/comparePopulation';
import dataProvider from './dataProvider';
import './main.css';


function handleSelection(event, stream) {
  stream.next(event.target.value);
  renderAppInterface();
}

function renderAppInterface() {
  const header = document.createElement('h1');
  header.innerText = i18n.t('title');
  const citySelector = document.createElement('div');
  const chartContainer = document.createElement('div');
  const subtitle = document.createElement('h2');
  subtitle.innerText = i18n.t('subtitle');
  const comparisonCitySelector = document.createElement('div');
  const compare = document.createElement('div');

  document.getElementById('app').replaceChildren(header, citySelector, chartContainer, subtitle, comparisonCitySelector, compare);

  ReactDOM.render(
    <CitySelector
      city={dataProvider.selectedCityStream.getValue()}
      handleSelection={(event) => {handleSelection(event, dataProvider.selectedCityStream);}}
    />,
    citySelector
  );
  ReactDOM.render(<Chart />, chartContainer);
  ReactDOM.render(

    <CitySelector
      city={dataProvider.comparisonCityStream.getValue()}
      handleSelection={(event) => {handleSelection(event, dataProvider.comparisonCityStream);}}
    />,
    comparisonCitySelector
  );
  ReactDOM.render(<ComparePopulation />, compare);
}

function renderRoot() {
  const root = document.createElement('div');
  root.id = 'root';

  const langSelector = renderLanguageSelector();
  root.appendChild(langSelector);

  const app = document.createElement('div');
  app.id = 'app';
  root.appendChild(app);

  return root;
}

i18next.on('languageChanged', () => {
  renderAppInterface();
});

document.body.appendChild(renderRoot());

renderAppInterface();
