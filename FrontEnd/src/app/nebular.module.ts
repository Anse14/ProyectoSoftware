import { NgModule } from '@angular/core';
import { 
  NbLayoutModule, 
  NbCardModule 
} from '@nebular/theme';

@NgModule({
  exports: [
    NbLayoutModule,
    NbCardModule
  ]
})
export class NebularModule {}
