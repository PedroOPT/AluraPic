import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/user/user.service';
import * as StackTrace from 'stacktrace-js';
import { ServerLogService } from './server-log.service';
import { environment } from '../../../environments/environment'

@Injectable()
export class GlobalErrorHandler implements ErrorHandler{

    constructor(private injector: Injector) { }

    handleError(error: any): void {
        console.log('Passei pelo handler');
        const location = this.injector.get(LocationStrategy);
        const userService = this.injector.get(UserService);
        const serverLogService = this.injector.get(ServerLogService)
        const router = this.injector.get(Router)

        const url = location instanceof PathLocationStrategy ? location.path() : '';
        const message = error.message ? error.message : error.toString();

        if(environment.production) {
            router.navigate(['/error']);
        }

        StackTrace.fromError(error).then(stackFrames =>{
            const stackAsString = stackFrames.map( sf => sf.toString()).join('\n');
            console.log(message);
            console.log(stackAsString);

            serverLogService.log(
                {
                    message,
                     url, 
                     userName: userService.getUserName(), 
                     stack: stackAsString
                    }
                ).subscribe(()=>{
                    console.log('Error logged on server')
                }, err => {
                    console.log(err)
                    console.log('Fail to send error logged server')
                })

            //console.log({message, url, userName: userService.getUserName(), stack: stackAsString})

        })
    }

    //Permite que o desenvolvedor padronize facilmente a exibição da stack do jeito que achar melhor.
    //O método StackTrace.fromError transforma a stacktrace de um Error em um array no qual cada item do array é uma stackframe. Sendo um array, podemos aplicar os métodos de transformação presentes em um Array para chegarmos na exibição que desejamos.

    //Através de Injector.get(NomeDaDependencia) temos acesso a uma instância criada pelo injector do Angular. Caso a instâncias tenha dependências, elas serão resolvidas pelo contêiner de injeção do Angular.

}