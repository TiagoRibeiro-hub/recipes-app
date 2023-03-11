import { BaseModel } from "@models/baseModel";

export class Ingredient extends BaseModel {
  constructor(
    public override id: string,
    public name: string,
    public amount: number,
    public metricUnit: MetricUnit
  ) {
    super(id);
  }

  static empty(): Ingredient {
    return new Ingredient('', '', 0, undefined)
  }

}

export enum MetricUnit {
  KILOGRAM,
  LITER,
  UNIT,
}

export const MetricUnitMapping: Record<MetricUnit, string> = {
  [MetricUnit.KILOGRAM]: 'Kg.',
  [MetricUnit.LITER]: 'L.',
  [MetricUnit.UNIT]: 'Un.',
};

export const MetricUnitToDropDownForm = Object.values(MetricUnit).filter(
  (value) => typeof value === 'number'
);
