import { QuestionCircleOutlined } from "@ant-design/icons";
import { Popover, Space, Typography } from "antd";
import React from "react";
import { Column, Row } from "./ClubhouseGraphics.style";
import { ResponsiveBar } from "./ResponsiveBar";

const { Title, Paragraph } = Typography;

export const IterationDetails: React.FunctionComponent<{
  name: string;
  dataPerDay: AggregatedIterationsDataValue[];
  totalCompletePercentage: number;
}> = ({ name, dataPerDay, totalCompletePercentage }) => {
  return (
    <div>
      <Title level={3}>{name}</Title>
      <Row>
        <Space size="large">
          <Column>
            <Title level={5}>Cumulative task flow diagram</Title>
            <Paragraph>
              Shows the number of tasks by state (todo, doing, done) for each
              working day.
            </Paragraph>
            <ResponsiveBar
              data={dataPerDay}
              indexBy="day"
              keys={["todoCount", "doingCount", "doneCount"]}
            />
          </Column>
          <Column>
            <Title level={5}>Cumulative Points Flow Diagram</Title>
            <Paragraph>
              Shows the number of points by state (todo, doing, done) for each
              working day.
            </Paragraph>
            <ResponsiveBar
              data={dataPerDay}
              indexBy="day"
              keys={["todoPoints", "doingPoints", "donePoints"]}
            />
          </Column>
          <Column>
            <Title level={5}>Daily points complition porcentage</Title>
            <Paragraph>
              Shows the porcentage of completed points for each day. It's
              calculated with the following formula:
              <Popover
                content={
                  <>
                    <p>idealDailyPoints = totalPoints/workingDays</p>
                    <p>
                      completedPointsPorcentage =
                      donePoints/(idealDailyPoints*daysCompleted)
                    </p>
                  </>
                }
                title="Calculation method"
              >
                <QuestionCircleOutlined style={{ minWidth: 36 }} />
              </Popover>
            </Paragraph>
            <ResponsiveBar
              data={dataPerDay}
              indexBy="day"
              keys={["completedPointsPercentage"]}
            />
          </Column>
        </Space>
      </Row>
    </div>
  );
};
