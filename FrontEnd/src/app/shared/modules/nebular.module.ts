import { NgModule } from '@angular/core';
import { 
  NbLayoutModule, 
  NbCardModule, 
  NbIconModule,
  NbToastrModule,
  NbSidebarModule
} from '@nebular/theme';

@NgModule({
  exports: [
    NbLayoutModule,
    NbCardModule,
    NbIconModule
  ]
})
export class NebularModule {}
