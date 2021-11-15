import { NgModule } from '@angular/core';
import { 
  NbLayoutModule, 
  NbCardModule, 
  NbIconModule
} from '@nebular/theme';

@NgModule({
  exports: [
    NbLayoutModule,
    NbCardModule,
    NbIconModule
  ]
})
export class NebularModule {}
