import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { Router, RouterOutlet } from '@angular/router';

import { UserService } from '@/services/user.service';
import { HeaderComponent } from '@/components/Header/header.component';
import { NewHelpStepsComponent } from '@/components/NewHelpSteps/new-help-steps.componen';

type TCategories = 'games' | 'health' | 'music' | 'reform' | 'emergency' | 'hospital';
type TOptions = { name: string; icon: string; category: TCategories };

@Component({
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NewHelpStepsComponent, SvgIconComponent, CommonModule],
  providers: [UserService],
  templateUrl: './new-help.component.html',
})
export class NewHelpComponent {
  readonly logged = this.userSignal.select('logged');
  readonly options: TOptions[] = [
    { name: 'Jogos', icon: 'public/assets/rocket.svg', category: 'games' },
    { name: 'Saúde', icon: 'public/assets/heart.svg', category: 'health' },
    { name: 'Música', icon: 'public/assets/headphones.svg', category: 'music' },
    { name: 'Reforma', icon: 'public/assets/home.svg', category: 'reform' },
    { name: 'Emergência', icon: 'public/assets/life-buoy.svg', category: 'emergency' },
    { name: 'Hospitalar', icon: 'public/assets/activity.svg', category: 'hospital' },
  ];

  selected = signal<TCategories | null>(null);

  constructor(
    private userSignal: UserService,
    private router: Router,
  ) {
    if (!this.logged()) {
      this.router.navigate(['/login']);
    }
  }

  public onSelect(opt: TCategories) {
    if (this.selected() === opt) {
      return this.selected.set(null);
    }
    this.selected.set(opt);
  }
}
