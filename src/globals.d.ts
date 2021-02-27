declare global {
  type FlowData = {
    [key: string]: {
      [key: string]: {
        count: number;
        points: number;
      };
    };
  };

  type Iteration = {
    name: string;
    value: FlowData;
  };

  type WorkflowState = {
    color?: string;
    created_at?: string;
    description?: string;
    entity_type?: string;
    id: number;
    name: string;
    num_stories?: number;
    num_story_templates?: number;
    position?: number;
    type?: string;
    updated_at?: string;
    verb: string | null;
  };

  type Workflow = {
    auto_assign_owner?: true;
    created_at?: string;
    default_state_id?: number;
    description?: string;
    entity_type?: string;
    id: number;
    name: string;
    project_ids: number[];
    states: WorkflowState[];
    team_id?: number;
    updated_at?: string;
  };

  type AggregatedIterationsDataValue = {
    idealCompletedPoints: number;
    completedPointsPercentage: number;
    day: string;
    todoPoints: number;
    todoCount: number;
    doingPoints: number;
    doingCount: number;
    donePoints: number;
    doneCount: number;
    totalPoints: number;
    idealCompletedPoints?: number;
    completedPointsPercentage?: number;
  };
  type AggregatedIterationsData = {
    name: string;
    values: AggregatedIterationsDataValue[];
    totalCompletePercentage: number;
    addedPoints: number;
    donePoints: number;
  };
}

export {};
