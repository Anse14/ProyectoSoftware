import { NgModule } from '@angular/core';
import { 
  NbLayoutModule, 
  NbCardModule,
  NbSidebarModule,
} from '@nebular/theme';

@NgModule({
  imports: [
    NbLayoutModule,
    NbCardModule,
    NbSidebarModule,
  ]
})
export class NebularModule {}
