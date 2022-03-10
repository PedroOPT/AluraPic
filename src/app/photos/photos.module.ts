
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoModule } from './photo/photo.module';
import { PhotoListModule } from './photo-list/photo-list.module';
import { PhotoFormModule } from './photo-form/photo-form.module';
import { PhotoDetailsModule } from './photo-details/photo-details.module';

@NgModule({
    imports: [
        HttpClientModule,
        CommonModule, //para usar as diretivas do browser module em outros modulos (ngfor...)
        PhotoModule,
        PhotoFormModule,
        PhotoListModule,
        PhotoDetailsModule,
    ]
})
export class PhotosModule {}