import { Component, EventEmitter, inject, Output } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { GlobalErrorService } from '../../services/global-error-service/global-error-service';
import { MatButtonModule } from '@angular/material/button';
import { CachingService } from '../../services/caching/caching.service';
import { UrlService } from '../../services/url/url.service';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [AsyncPipe, MatButtonModule],
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent {
  private readonly errorService = inject(GlobalErrorService);
  private readonly urlService = inject(UrlService);
  private readonly cachingService = inject(CachingService);
  readonly error$ = this.errorService.error$;

  @Output() retryClicked = new EventEmitter();

  retry(): void {
    this.retryClicked.emit();
    this.cachingService.clear();
    this.errorService.clearError();
    this.urlService.triggerRefresh();
  }
}
