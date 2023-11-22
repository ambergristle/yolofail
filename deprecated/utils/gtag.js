export const GA_TRACKING_ID = process.env.GA_TRACKING_ID;

// set tracking id and url in gtag instance
export const pageView = (url) => {
  window.gtag("config", GA_TRACKING_ID, { page_path: url });
};

// pass action details to gtag instance on event
export const event = ({ action, category, label, value }) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};
