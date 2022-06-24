import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-icon-button',
    templateUrl: './icon-button.component.html',
    styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent implements OnInit {

    @Input() textButton = '';
    @Input() classNameIcon = '';
    @Input() disabled?: boolean;
    @Input() typeButton: string = 'primary' || 'secundary';
    @Input() textFirst = false;
    @Output() actionClick = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit(): void {
    }

    onClickButton() {
        this.actionClick.emit();
    }

}
