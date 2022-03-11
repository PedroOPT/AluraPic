import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { PlatformdetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {

    fromUrl: string;
    loginForm: FormGroup;
    @ViewChild('userNameInput') usarNameInput: ElementRef<HTMLInputElement>;

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private platformDetectorService: PlatformdetectorService, private titleService: Title, private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        //this.titleService.setTitle('Login') //aletra o titulo da página (component)
        this.activatedRoute.queryParams.subscribe(params => this.fromUrl = params.fromUrl) //passando a tentativa da rota nao autorizada para from url atraves da queryparams
        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.platformDetectorService.isPlatformBrowser() && //se for true executa o focus, se não, não
            this.usarNameInput.nativeElement.focus();
    }

    login() {
        const userName = this.loginForm.get('userName').value;
        const password = this.loginForm.get('password').value;
        this.authService.authenticate(userName, password).subscribe(
            () => {
                if (this.fromUrl) {
                    this.router.navigateByUrl(this.fromUrl)
                }
                else {
                    this.router.navigate(['user', userName])
                }
            },
            err => {
                console.log(err);
                this.loginForm.reset();
                this.platformDetectorService.isPlatformBrowser() && //se for true executa o focus, se não, não
                    this.usarNameInput.nativeElement.focus();
                alert('Invalid user name or password');
            }
        )
    }

}