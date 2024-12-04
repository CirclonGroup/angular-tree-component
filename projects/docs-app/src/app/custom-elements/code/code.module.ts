import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeComponent } from './code.component';
import { PrettyPrinter } from './pretty-printer.service';
import { CopierService } from '../../shared/copier.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    imports: [CommonModule, MatSnackBarModule],
    declarations: [CodeComponent],
    exports: [CodeComponent],
    providers: [PrettyPrinter, CopierService]
})
export class CodeModule { }
