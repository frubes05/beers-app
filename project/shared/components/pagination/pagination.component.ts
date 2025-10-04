import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  Signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  @Input({ required: true }) showPagination!: boolean;
  @Input({ required: true }) showBackButton!: boolean;
  @Input({ required: true }) page!: Signal<number>;

  @Output() nextPage = new EventEmitter<number>();
  @Output() previousPage = new EventEmitter<number>();

  next(pg: number) {
    this.nextPage.emit(pg);
  }

  prev(pg: number) {
    if (this.page() > 1) {
      this.nextPage.emit(pg);
    }
  }
}
