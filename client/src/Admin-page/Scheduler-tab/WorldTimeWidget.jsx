import React, { useEffect } from "react";

const WorldTimeBuddyWidget = () => {
  useEffect(() => {
    // Re-initialize the World Time Buddy widget after it loads
    window.wtb_event_widgets && window[window.wtb_event_widgets.pop()].init();
  }, []);

  const widgetHtml = `
    <iframe src="https://widgets.commoninja.com/iframe/4296b5dd-e06f-4242-bcdd-861349dbe06b" width="100%" height="100%" frameborder="0" scrolling=""></iframe>
  `;

  return <div dangerouslySetInnerHTML={{ __html: widgetHtml }} />;
};

export default WorldTimeBuddyWidget;
