import { Directive, ElementRef, OnInit } from '@angular/core';
import { PlatformdetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Directive({
    selector: '[immediateClick]'
})
export class ImmediateClickDirective implements OnInit{

    constructor (private element: ElementRef<any>, private platformDetector: PlatformdetectorService) { }
    
    ngOnInit(): void {
        this.platformDetector.isPlatformBrowser() &&
            this.element.nativeElement.click();
    }
    
}