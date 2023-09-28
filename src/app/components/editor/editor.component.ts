import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import Quill from 'quill';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html'
})
export class EditorComponent implements AfterViewInit {
    @Input() readOnly: any;
    @ViewChild('quillEditor') editorRef: ElementRef;

    quillConfig: any = [
        
            ['bold', 'italic', 'underline', /*'strike'*/ ],        // toggled buttons
            // ['blockquote', 'code-block'],
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': 1 }, { 'header': 2 },],               // custom button values
            [{ 'align': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            // [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            // [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            // [{ 'direction': 'rtl' }],                         // text direction
            // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            // [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            ['clean'],                                         // remove formatting button
            // ['link', 'image', 'video']                         // link and image, video
        
    ];

    constructor() { }

    ngAfterViewInit(): void {
        const quill = new Quill(this.editorRef.nativeElement, {
            modules: {
                toolbar: this.quillConfig
            },
            placeholder: 'Escriba aquí sus observaciones...',
            readOnly: this.readOnly,
            theme: 'snow'
        });
    }

}
