import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'blog-create-article',
    templateUrl: './create-article.component.html',
    styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {
    createArticleForm = new FormGroup({
        title: new FormControl(''),
        body: new FormControl('')
    });

    constructor() { }

    ngOnInit(): void {
    }

    onSubmit() {
        console.log('SUBMITTED', this.createArticleForm.value);
    }

    onReset() {
        this.createArticleForm.reset();
    }
}
