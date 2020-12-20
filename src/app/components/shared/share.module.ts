import { CommonModule} from '@angular/common';
import { FormsModule} from '@angular/forms';
import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule
    ],
    exports: [
        CommonModule,
        FormsModule,
    ],
    providers: []
})
export class ShareModule {}
