import i18next from 'i18next';

import enTranslation from './locales/en-US.json';
import huTranslation from './locales/hu-HU.json';
import srTranslation from './locales/sr-RS.json';

i18next
  .init({
    lng: 'en-US',
    fallbackLng: 'en-US',
    debug: true,
    resources: {
      'en-US': {
        translation: enTranslation,
      },
      'sr-RS': {
        translation: srTranslation,
      },
    },
  })
  .then(function (t) {
    // initialized and ready to go!
    console.info('i18next is initialized.', t('welcome'));
  });

i18next.addResourceBundle('hu-HU', 'translation', huTranslation);

export default i18next;
