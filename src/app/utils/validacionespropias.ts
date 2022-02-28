import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
export class Validacionespropias {

    // sin parametros
    // static lectura(actual: AbstractControl, anterior: AbstractControl): ValidationErrors | null {
    //     if (anterior > actual) {
    //         return null;
    //     } else {
    //         return { mayor: true }
    //     }
    // }

    static lectura(anterior: number) {
        return (control: AbstractControl) => {
            const value = control.value;
            console.log(value);
            console.log(anterior);

            if (anterior > value) {
                return { mayor: true }
            } else {
                return null;
            }
        }
    }
}
