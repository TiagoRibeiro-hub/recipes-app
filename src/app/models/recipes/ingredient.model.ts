export class Ingredient {  
    constructor(
        public id: string,
        public name: string, 
        public amount: number,
        public metricUnit: MetricUnit) { }
}

export enum MetricUnit {
    KILOGRAM,
    LITER,
    UNIT
}

export const MetricUnitMapping: Record<MetricUnit, string> = {
    [MetricUnit.KILOGRAM]: "Kg.",
    [MetricUnit.LITER]: "L.",
    [MetricUnit.UNIT]: "Un.",
};

export const MetricUnitToDropDownForm = Object.values(MetricUnit).filter(value => typeof value === 'number');