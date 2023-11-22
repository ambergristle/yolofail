export const FB_PIXEL_ID = process.env.FB_PIXEL_ID;

// set fbq instance
export const pageView = () => {
  window.fbq("track", "PageView");
};

// pass action details to fbq instance on event
export const event = (name, options = {}) => {
  window.fbq("track", name, options);
};
