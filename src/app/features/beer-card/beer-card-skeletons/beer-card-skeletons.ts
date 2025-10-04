import { Component } from '@angular/core';
import { Card } from '../../../components/card/card';
import { Skeleton } from '../../../components/skeleton/skeleton';

@Component({
  selector: 'app-beer-card-skeletons',
  imports: [Card, Skeleton],
  templateUrl: './beer-card-skeletons.html',
  styleUrl: './beer-card-skeletons.scss',
})
export class BeerCardSkeletons {}
