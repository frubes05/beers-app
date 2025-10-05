import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { GlobalErrorService } from '@core/services/global-error-service/global-error.service';
import { MatButtonModule } from '@angular/material/button';
import { CachingService } from '@core/services/caching-service/caching.service';
import { UrlService } from '@core/services/url-service/url.service';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {
  private readonly errorService = inject(GlobalErrorService);
  private readonly urlService = inject(UrlService);
  private readonly cachingService = inject(CachingService);

  @Input() error!: string;
  @Output() retryClicked = new EventEmitter();

  retry(): void {
    this.retryClicked.emit();
    this.cachingService.clear();
    this.errorService.clearError();
    this.urlService.triggerRefresh();
  }
}
