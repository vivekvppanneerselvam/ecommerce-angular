import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { EditProductComponent } from '../modals/edit-product/edit-product.component';

@Component({
    selector: 'edit-product-cell',
    template: '<span><i-edit class="icon-sm" style = "height: 15px;width: 15px;" (click)="invokeParentMethod()"></i-edit></span>',  
})
export class EditProductRenderer implements ICellRendererAngularComp {

    public params: any;
    constructor(private modalService: NgbModal){}

    agInit(params: any): void {
        this.params = params;
    }
    public invokeParentMethod() {
        const modalRef = this.modalService.open(EditProductComponent);
            this.params.context.componentParent.methodFromParent('Row: ${this.params.node.rowIndex}, Col: ${this.params.colDef.headerName}')
    }
    refresh(): boolean {
        return false;
    }
}