import React from "react";
import { Space, Typography } from "antd";
import { Row, Column } from "./ClubhouseGraphics.style";
import { ResponsiveBar } from "./ResponsiveBar";

const { Title, Paragraph } = Typography;

export const IterationGeneralReport: React.FunctionComponent<{
  data: AggregatedIterationsData[];
}> = ({ data }) => {
  return (
    <div>
      <Title level={3}>Iterations aggregated data</Title>
      <Row>
        <Space size="large">
          <Column>
            <Title level={5}>Number of done points / iteration</Title>
            <Paragraph>
              Measures the number of done points at the end of the sprint. There
              isn't an ideal number of points as those are points of added
              product value not points of effort
            </Paragraph>
            <ResponsiveBar data={data} indexBy="name" keys={["donePoints"]} />
          </Column>

          <Column>
            <Title level={5}>Daily complition procentage average</Title>
            <Paragraph>
              Measures if the team has constant speed durring a sprint. Ideal
              value is 1%. This metric is an average of Daily points complition
              porcentage
            </Paragraph>
            <ResponsiveBar
              data={data}
              indexBy="name"
              keys={["totalCompletePercentage"]}
            />
          </Column>

          <Column>
            <Title level={5}>Added points porcentage</Title>
            <Paragraph>
              Measures the number of points added after the start of the sprint.
              Ideal value is 0%. This metric helps spot an poor prepared sprint
              or a change of scope.
            </Paragraph>
            <ResponsiveBar data={data} indexBy="name" keys={["addedPoints"]} />
          </Column>
        </Space>
      </Row>
    </div>
  );
};
