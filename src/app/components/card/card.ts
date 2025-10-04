import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCard, MatCardHeader, MatCardContent, MatCardActions } from '@angular/material/card';

@Component({
  selector: 'app-card',
  imports: [MatCard, MatCardHeader, MatCardContent, MatCardActions, NgClass],
  templateUrl: './card.html',
})
export class Card {
  @Input() className = '';
}
