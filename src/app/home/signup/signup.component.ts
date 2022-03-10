import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlatformdetectorService } from 'src/app/core/platform-detector/platform-detector.service';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { NewUser } from './newUser';
import { SignUpService } from './signup.service';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';

@Component({
    templateUrl: './signup.component.html',
    providers: [
        UserNotTakenValidatorService
    ]
})
//Quando tem scopo de página não é necessário selctor
export class SignUpComponent implements OnInit{

    signupForm: FormGroup
    @ViewChild('inputEmail') inputEmail: ElementRef<HTMLInputElement>;

    constructor(private formBuilder: FormBuilder, private userNotTakenValidatorService: UserNotTakenValidatorService ,private signUpService: SignUpService, private router: Router, private platformDetectorService: PlatformdetectorService) { }

    ngOnInit(): void {
        this.signupForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
            userName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), lowerCaseValidator], this.userNotTakenValidatorService.checkUserNameTaken()],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(14)]]
        });
        this.platformDetectorService.isPlatformBrowser() && //se for true executa o focus, se não, não
            this.inputEmail.nativeElement.focus();
    }

    signUp(){
        const newUser = this.signupForm.getRawValue() as NewUser;
        console.log('User' + newUser)
        this.signUpService.signUp(newUser).subscribe(() => this.router.navigate(['']));
    }

}