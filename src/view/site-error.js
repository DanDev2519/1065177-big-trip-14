import Abstract from './abstract.js';

const createErrorTemplate = () => {
  return `<p class="trip-events__msg">
    Something wrong =(
    Please, refresh page or try again later
  </p>`;
};

class SiteError extends Abstract {
  getTemplate() {
    return createErrorTemplate();
  }
}
export default SiteError;
