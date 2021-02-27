export class WorkflowEntity {
  public unstartedStates: string[];
  public startedStates: string[];
  public doneState: string[];
  private workflows: Workflow[];

  constructor(workflows: Workflow[]) {
    this.workflows = workflows;
    this.unstartedStates = this.getStatesByType("unstarted");
    this.startedStates = this.getStatesByType("started");
    this.doneState = this.getStatesByType("done");
  }

  private getStatesByType(type: string): string[] {
    return Array.from(
      new Set(
        this.workflows.reduce(
          (acc: string[], workflow) =>
            acc.concat(
              workflow.states
                .filter((state) => state.type === type)
                .map((state) => state.name)
            ),
          []
        )
      )
    );
  }
}
