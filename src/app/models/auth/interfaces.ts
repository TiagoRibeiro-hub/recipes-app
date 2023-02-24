import { FormGroup } from "@angular/forms";

export class IFormGroups {
    name: string;
    formGroup: FormGroup;
};

export interface IFormsGroups<T> {

    getFormGroup(model: T): FormGroup;

    setValidators(formGroup: FormGroup): void;
}

export interface IFormArraysGroups<T> {

    getFormArray(model: T[]): IFormGroups[]
}