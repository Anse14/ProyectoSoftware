import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbAuthToken, NbAuthResult, NbAuthService } from '@nebular/auth';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(private authService: NbAuthService) {
    this.authService
      .onTokenChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe((token: NbAuthToken) => {
        if (token && token.isValid()) {
          console.log(token);
        }
      });
  }

  ngOnInit(): void {}

  login() {
    this.authService
      .authenticate('google')
      .pipe(takeUntil(this.destroy$))
      .subscribe((authResult: NbAuthResult) => {});
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
