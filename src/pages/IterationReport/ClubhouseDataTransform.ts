export const aggregateChData = (
  data: Iteration[],
  todoStates: string[],
  doingStates: string[],
  doneStates: string[]
): AggregatedIterationsData[] => {
  const iterationsCalc = data.map(({ name, value }) => ({
    name,
    values: Object.keys(value)
      .map((key: string) => {
        return {
          day: key,
          todoPoints: todoStates.reduce(
            (acc, state) => acc + (value[key][state]?.points || 0),
            0
          ),
          todoCount: todoStates.reduce(
            (acc, state) => acc + (value[key][state]?.count || 0),
            0
          ),
          doingPoints: doingStates.reduce(
            (acc, state) => acc + (value[key][state]?.points || 0),
            0
          ),
          doingCount: doingStates.reduce(
            (acc, state) => acc + (value[key][state]?.count || 0),
            0
          ),
          donePoints: doneStates.reduce(
            (acc, state) => acc + (value[key][state]?.points || 0),
            0
          ),
          doneCount: doneStates.reduce(
            (acc, state) => acc + (value[key][state]?.count || 0),
            0
          ),
          totalPoints: todoStates
            .concat(doingStates)
            .concat(doneStates)
            .reduce((acc, state) => acc + (value[key][state]?.points || 0), 0),
        };
      })
      .sort((a, b) => {
        if (a.day < b.day) return -1;
        if (a.day > b.day) return 1;
        return 0;
      })
      .filter(({ day }) => ![0, 6].includes(new Date(day).getDay())),
  }));

  let iterationsCalcAdv = iterationsCalc.map(({ name, values }) => {
    const pointsToCompletePerDay =
      values.reduce((acc, { totalPoints }) => Math.max(acc, totalPoints), 0) /
      values.length;
    return {
      name,
      values: values.map((dayData, i) => ({
        ...dayData,
        idealCompletedPoints: pointsToCompletePerDay * (i + 1),
        completedPointsPercentage: parseFloat(
          (dayData.donePoints / (pointsToCompletePerDay * (i + 1))).toFixed(2)
        ),
      })),
      totalCompletePercentage: 0,
      addedPoints: 0,
      donePoints: 0,
    };
  });

  iterationsCalcAdv = iterationsCalcAdv.map(({ name, values }) => {
    const maxDays = values.filter(({ day }) => new Date(day) < new Date())
      .length;
    return {
      name,
      values,
      totalCompletePercentage: parseFloat(
        (
          values.reduce(
            (acc, { completedPointsPercentage }) =>
              acc + completedPointsPercentage,
            0
          ) / maxDays
        ).toFixed(2)
      ),
      addedPoints: parseFloat(
        (
          (values.reduce(
            (acc, { totalPoints }) => Math.max(acc, totalPoints),
            0
          ) -
            values[0].totalPoints) /
          values[0].totalPoints
        ).toFixed(2)
      ),
      donePoints: values[maxDays - 1].donePoints,
    };
  });
  return iterationsCalcAdv;
};
