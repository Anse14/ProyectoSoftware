import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastrService: NbToastrService) {}

  success(message: string) {
    this.toastrService.success('success', message);
  }

  error(message: string) {
    this.toastrService.danger('danger', message);
  }
}