/**
 * Блок определения констант
 */
const OPTIONS_MB = {}; // Materialize
const OPTIONS_TT = {}; // Materialize
const OPTIONS_DD = {}; // Materialize
const PHONE_MASK_OPTS = {
  mask: '+{7} (000) 000-00-00',
};

document.addEventListener('DOMContentLoaded', () => {
  const YEAR_SPAN = document.querySelector('#current_year');
  const TEL_INPUT = document.querySelector('#tel');
  const ADS_BLOCK = document.querySelector('#adsBlock');
  const LOAD_MORE_BTN = document.querySelector('#loadMore');
  const CURRENT_YEAR = new Date().getFullYear();

  /**
   * Materialize
   */
  const ELEMS_MB = document.querySelectorAll('.materialboxed');
  const ELEMS_TT = document.querySelectorAll('.tooltipped');
  const ELEMS_DD = document.querySelectorAll('.dropdown-trigger');
  const INSTANCES_MB = M.Materialbox.init(ELEMS_MB, OPTIONS_MB);
  const INSTANCES_TT = M.Tooltip.init(ELEMS_TT, OPTIONS_TT);
  const INSTANCES_DD = M.Dropdown.init(ELEMS_DD, OPTIONS_DD);


  /**
   * Блок алгоритма работы
   */
  YEAR_SPAN.innerText = CURRENT_YEAR;

  if (TEL_INPUT != null) {
    const MASK = IMask(TEL_INPUT, PHONE_MASK_OPTS);
  }
});
