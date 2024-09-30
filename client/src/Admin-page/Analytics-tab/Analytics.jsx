import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import { Button } from "antd";

const Analytics = () => {
  const location = useLocation();

  // Track page view on route change
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);

  // Function to handle button click and track custom event
  const handleButtonClick = () => {
    ReactGA.event({
      category: "User",
      action: "Clicked the Analytics Button",
      label: "Analytics Page Interaction",
    });
  };

  // Track page timing (optional)
  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const duration = Math.round(performance.now() - startTime);
      ReactGA.send({
        hitType: "timing",
        timingCategory: "Page Load Time",
        timingVar: "Analytics Page Load",
        timingValue: duration,
      });
    };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Google Analytics Integration</h1>
      <p>Google Analytics is tracking this page's views and interactions.</p>

      {/* Example button to track custom events */}
      <Button
        type="primary"
        onClick={handleButtonClick}
        style={{ marginTop: "20px" }}
      >
        Track Event
      </Button>
    </div>
  );
};

export default Analytics;
