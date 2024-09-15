import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import timelineData from "../data/timelineData.json";
import {
  faBriefcase,
  faGraduationCap,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TimelineComponent = () => {
  const iconMap = {
    briefcase: faBriefcase,
    "graduation-cap": faGraduationCap,
    cogs: faCogs,
  };
  return (
    <VerticalTimeline>
      {timelineData.map((item, index) => (
        <VerticalTimelineElement
          key={index}
          className={`vertical-timeline-element--${item.subtitle.toLowerCase()}`}
          date={item.date}
          iconStyle={{ background: item.iconColor, color: "#fff" }}
          icon={<FontAwesomeIcon icon={iconMap[item.icon]} />}
        >
          <h3 className="vertical-timeline-element-title">{item.title}</h3>
          <h4 className="vertical-timeline-element-subtitle">
            {item.subtitle}
          </h4>
          <p>{item.description}</p>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  );
};

export default TimelineComponent;
