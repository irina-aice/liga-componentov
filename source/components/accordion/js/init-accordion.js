import {Accordions} from './accordions';
let accordions;

const initAccordions = () => {
  accordions = new Accordions();
  // Раскомментировать только при запросе бэкэнда на вынос экземпляра класса в глобальную область видимости
  // window.accordions = accordions;
};

export {initAccordions, accordions};
