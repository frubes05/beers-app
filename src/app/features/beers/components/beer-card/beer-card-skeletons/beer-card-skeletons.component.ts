import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardComponent } from '../../../../../shared/components/card/card.component';
import { SkeletonComponent } from '../../../../../shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-beer-card-skeletons',
  imports: [CardComponent, SkeletonComponent],
  templateUrl: './beer-card-skeletons.component.html',
  styleUrl: './beer-card-skeletons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeerCardSkeletons {}
