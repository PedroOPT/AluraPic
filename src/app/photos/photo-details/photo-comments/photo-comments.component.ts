import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PhotoComment } from '../../photo/photo-comment';
import { PhotoService } from '../../photo/photo.service';
import { switchMap, tap } from 'rxjs/operators'

@Component({
    selector: 'ap-photo-comments',
    templateUrl: './photo-comments.component.html',
    styleUrls: ['photo-comments.css']
})
export class PhotoCommentsComponent implements OnInit {

    @Input() photoId: number;

    comments$: Observable<PhotoComment[]>;
    commentForm: FormGroup;

    constructor(private photoService: PhotoService, private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.comments$ = this.photoService.getComments(this.photoId);
        this.commentForm = this.formBuilder.group({
            comment:['',Validators.maxLength(300)]
        });
    }

    save(){
        const comment = this.commentForm.get('comment').value as string;
        this.comments$ = this.photoService.addComment(this.photoId, comment)
        .pipe(switchMap(() => this.photoService.getComments(this.photoId)))
        .pipe(tap(()=> this.commentForm.reset()));
        //O operador switchMap cancela o Observable anterior passando o fluxo para um novo Observable, garantindo assim que a emissão tenha apenas o valor emitido pelo Observable retornado por switchMap.
    }

}