import React from "react";
import { Bar } from "@nivo/bar";

export const commonProps = {
  width: 480,
  height: 350,
  margin: { top: 20, right: 50, bottom: 100, left: 50 },
  padding: 0.2,
  labelTextColor: "inherit:darker(1.4)",
  labelSkipWidth: 16,
  labelSkipHeight: 16,
  axisBottom: { tickRotation: -20 },
};

export const ResponsiveBar: React.FunctionComponent<any> = ({
  data,
  keys,
  indexBy = "name",
}) => {
  return <Bar {...commonProps} data={data} indexBy={indexBy} keys={keys} />;
};
