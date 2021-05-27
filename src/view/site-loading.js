import Abstract from './abstract.js';

const createErrorTemplate = () => {
  return `<p class="trip-events__msg">
    Loading...
  </p>`;
};

class SiteLoading extends Abstract {
  getTemplate() {
    return createErrorTemplate();
  }
}
export default SiteLoading;
