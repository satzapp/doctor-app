import { AbstractControl, ValidatorFn } from '@angular/forms';

export default class Validation {
    static match(controlName: string, checkControlName: string): ValidatorFn {
        return (absControls: AbstractControl) => {
            const control = absControls.get(controlName);
            const checkControl = absControls.get(checkControlName);

            if (checkControl && checkControl.errors && !checkControl.errors.matching) {
                return null;
            }

            if (control && checkControl && (control.value !== checkControl.value)) {
                absControls.get(checkControlName).setErrors({ matching: true });
                return { matching: true };
            } else {
                return null;
            }
        };
    }
}
