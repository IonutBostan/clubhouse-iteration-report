import React, { useState } from "react";
import { Button, Input } from "antd";
import { aggregateChData as aggregateIterationsData } from "./ClubhouseDataTransform";
import { Column, Row, CustomRow } from "./ClubhouseGraphics.style";
import { PlusOutlined } from "@ant-design/icons";
import { WorkflowEntity } from "entities/Workflow";
import { workflows } from "constants/workflows";
import { IterationDetails } from "./IterationDetails";
import { useLocalStorage } from "hooks";
import { clubhouseIterationSample } from "constants/iterations";
import { IterationGeneralReport } from "./IterationGeneralReport";

const {
  unstartedStates: defaultUnstartedStates,
  startedStates: defaultStartedStates,
  doneState: defaultDoneState,
} = new WorkflowEntity(workflows);

export const IterationReport = () => {
  const [localStorageIterations, setLocalStorageIterations] = useLocalStorage(
    "iterations",
    JSON.stringify([clubhouseIterationSample])
  );

  const [unstartedStates, setUnstartedStates] = useState<string[]>(
    defaultUnstartedStates
  );
  const [startedStates, setStartedStates] = useState<string[]>(
    defaultStartedStates
  );
  const [doneStates, setDoneStates] = useState<string[]>(defaultDoneState);

  const iterations: Iteration[] = JSON.parse(localStorageIterations);
  const setIterations = (data: Iteration[]) => {
    setLocalStorageIterations(JSON.stringify(data));
  };

  const aggregatedIterationsData = aggregateIterationsData(
    iterations,
    unstartedStates,
    startedStates,
    doneStates
  );

  return (
    <Column>
      <CustomRow>
        <span>Todo States:</span>
        <Input
          value={unstartedStates}
          onChange={(a) => setUnstartedStates(a.currentTarget.value.split(","))}
        />
      </CustomRow>
      <CustomRow>
        <span>Doing States:</span>
        <Input
          value={startedStates}
          onChange={(a) => setStartedStates(a.currentTarget.value.split(","))}
        />
      </CustomRow>
      <CustomRow>
        <span>Done States:</span>
        <Input
          value={doneStates}
          onChange={(a) => setDoneStates(a.currentTarget.value.split(","))}
        />
      </CustomRow>
      <CustomRow>
        <span>Iterations data</span>
        <Column style={{ width: "100%" }}>
          {iterations.map(({ name, value }, i) => (
            <CustomRow key={i} style={{ width: "100%" }}>
              <Input
                placeholder="Iteration name"
                value={name}
                style={{ width: "250px", marginRight: "10px" }}
                onChange={(event) =>
                  setIterations([
                    ...iterations.slice(0, i),
                    { name: event.currentTarget.value, value },
                    ...iterations.slice(i + 1),
                  ])
                }
              />
              <Input
                value={JSON.stringify(value)}
                onChange={(event) =>
                  setIterations([
                    ...iterations.slice(0, i),
                    { name, value: JSON.parse(event.currentTarget.value) },
                    ...iterations.slice(i + 1),
                  ])
                }
              />
            </CustomRow>
          ))}
        </Column>
      </CustomRow>
      <Row style={{ justifyContent: "center" }}>
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          onClick={() => {
            setIterations([...iterations, clubhouseIterationSample]);
          }}
        />
      </Row>
      <CustomRow>
        <Column>
          <IterationGeneralReport data={aggregatedIterationsData} />
          {aggregatedIterationsData.map(
            ({ name, values, totalCompletePercentage }, i) => (
              <IterationDetails
                key={i}
                name={name}
                dataPerDay={values}
                totalCompletePercentage={totalCompletePercentage}
              />
            )
          )}
        </Column>
      </CustomRow>
    </Column>
  );
};
