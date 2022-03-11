import { FormGroup, ValidatorFn } from '@angular/forms';

export const userNamePasswordValidator: ValidatorFn = (formGroup: FormGroup) =>{
    const userName = formGroup.get('userName').value;
    const password = formGroup.get('password').value;
    if(userName.trim() + password.trim()){
        return userName != password ? null : { userNamePasswordValidator: true }
    }

    //Testamos se o nome do usuário é diferente da senha, mas apenas se algum dos campos forem diferente de branco. Caso sejam iguais, haverá um erro de validação.
    //Um validador crossfield nada mais é do que uma função. Ela recebe como parâmetro um objeto do tipo FormGroup
}