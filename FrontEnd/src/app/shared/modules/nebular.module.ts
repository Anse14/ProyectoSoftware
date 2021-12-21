import { NgModule } from '@angular/core';
import { 
  NbLayoutModule, 
  NbCardModule, 
  NbIconModule,
  NbToastrModule,
  NbSidebarModule,
  NbSelectModule
} from '@nebular/theme';

@NgModule({
  exports: [
    NbLayoutModule,
    NbCardModule,
    NbIconModule,
    NbSelectModule
  ]
})
export class NebularModule {}
