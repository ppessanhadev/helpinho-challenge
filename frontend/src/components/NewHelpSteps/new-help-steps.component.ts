import { Component } from '@angular/core';
import { HelpService } from '@/services/help.service';
import { HeaderComponent } from '@/components/Header/header.component';
import { ButtonComponent } from '@/components/Button/button.component';

@Component({
  selector: 'app-new-help-steps',
  standalone: true,
  imports: [HeaderComponent, ButtonComponent],
  templateUrl: './new-help-steps.component.html',
})
export class NewHelpStepsComponent {
  readonly step = this.helpSignal.select('step');

  constructor(private helpSignal: HelpService) {}
}
