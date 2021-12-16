import { NgModule } from '@angular/core';
import { 
  NbLayoutModule, 
  NbCardModule, 
  NbIconModule,
  NbToastrModule
} from '@nebular/theme';

@NgModule({
  exports: [
    NbLayoutModule,
    NbCardModule,
    NbIconModule,
  ]
})
export class NebularModule {}
