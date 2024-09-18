import { Component, Input } from '@angular/core';
import { UserService } from '@/services/user.service';
import { HeaderComponent } from '@/components/Header/header.component';
import { ButtonComponent } from '../Button/button.component';

@Component({
  selector: 'app-new-help-steps',
  standalone: true,
  imports: [HeaderComponent, ButtonComponent],
  providers: [UserService],
  templateUrl: './new-help-steps.component.html',
})
export class NewHelpStepsComponent {
  @Input() step: 1 | 2 | 3 | 4 = 1;
}
