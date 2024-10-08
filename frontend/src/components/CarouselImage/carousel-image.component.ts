import { CommonModule } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';
import { Component, Input, signal, OnInit, OnDestroy } from '@angular/core';

type TImagesInput = {
  path: string;
  title?: string;
  from?: {
    name: string;
    charge: string;
    company: string;
  };
};

@Component({
  selector: 'app-carousel-image',
  standalone: true,
  imports: [SvgIconComponent, CommonModule],
  templateUrl: './carousel-image.component.html',
})
export class CarouselImageComponent implements OnInit, OnDestroy {
  @Input() initialPage: 0 | 1 = 0;
  @Input() images: TImagesInput[] = [
    {
      path: 'public/assets/amelia-laurent.png',
      title: 'O Helpinho pode mudar a vida de milhões de pessoas todos os dias',
      from: {
        name: 'Amelia Laurent',
        charge: 'Diretora de recursos, ONG',
        company: 'Web Development Agency',
      },
    },
    {
      path: 'public/assets/books-rissia.png',
      title: 'O Helpinho de hoje escreve o nosso amanha',
      from: {
        name: 'Julia Rissia',
        charge: 'Escritora, Editora chefe',
        company: 'Editora CBA',
      },
    },
  ];

  public page = signal<number>(0);
  public autoChanger?: NodeJS.Timeout;

  public ngOnInit() {
    this.page.set(this.initialPage);
    this.autoChanger = setInterval(() => this.next(true), 10000);
  }

  public ngOnDestroy() {
    this.clearAutoChanger();
  }

  public next(changer = false) {
    if (!changer) this.clearAutoChanger();
    if (this.page() === this.images.length - 1) return this.page.set(0);
    this.page.update((page) => page + 1);
  }

  public previous(changer = false) {
    if (!changer) this.clearAutoChanger();
    if (this.page() === 0) return this.page.set(this.images.length - 1);
    this.page.update((page) => page - 1);
  }

  private clearAutoChanger() {
    if (this.autoChanger) {
      clearInterval(this.autoChanger);
    }
  }
}
