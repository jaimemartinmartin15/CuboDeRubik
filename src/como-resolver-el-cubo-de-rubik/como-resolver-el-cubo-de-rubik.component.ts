import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { intervalArray } from '@jaimemartinmartin15/jei-devkit-angular-shared';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArrowSvgComponent } from '../svg-output/arrow.component';
import { BurgerSvgComponent } from '../svg-output/burger.component';
import { CircularArrowSvgComponent } from '../svg-output/circular-arrow.component';
import { CubePictureComponent, SquareToPaint } from './cube-picture/cube-picture.component';
import { CubeRotationComponent } from './cube-rotation/cube-rotation.component';

@Component({
  selector: 'app-como-resolver-el-cubo-de-rubik',
  templateUrl: './como-resolver-el-cubo-de-rubik.component.html',
  styleUrls: ['./como-resolver-el-cubo-de-rubik.component.scss'],
  imports: [
    ArrowSvgComponent,
    BurgerSvgComponent,
    CircularArrowSvgComponent,
    CubeRotationComponent,
    CubePictureComponent,
    AsyncPipe,
  ],
})
export class ComoResolverElCuboDeRubikComponent {
  @ViewChild('sidebar')
  public sidebarEl: ElementRef<HTMLElement>;

  @ViewChildren('stepLink')
  public stepLinks: QueryList<ElementRef<HTMLAnchorElement>>;

  @ViewChildren('stepSection')
  public sections: QueryList<ElementRef<HTMLElement>>;

  @HostBinding('style.--menu-break-point')
  public MENU_BREAKPOINT: string = '1110px';

  @HostListener('window:scroll')
  public onWindowScroll() {
    const result = this.getMostVisibleSection();

    // reset all links
    [...this.stepLinks].forEach((sl) => sl.nativeElement.classList.remove('active'));

    // highlight current link
    [...this.stepLinks]
      .find((sl) => sl.nativeElement.hash === `#${result.section.id}`)!
      .nativeElement.classList.add('active');
  }

  public readonly COLORS = {
    WHITE: '#ffffff',
    YELLOW: '#ffff00',
    BLUE: '#0000ff',
    GREEN: '#4bb911',
    RED: '#ff0000',
    ORANGE: '#ffa500',
  };

  public showTopBar$: Observable<boolean>;

  public constructor(breakpointObserver: BreakpointObserver) {
    this.showTopBar$ = breakpointObserver
      .observe(`(max-width: ${this.MENU_BREAKPOINT})`)
      .pipe(map((result) => result.matches));
  }

  public paintFace(face: number, color: string): SquareToPaint[] {
    return intervalArray(9).map((n) => [face, n, color]);
  }

  public paintRow(face: number, row: 1 | 2 | 3, color: string): SquareToPaint[] {
    const rowsMapping = {
      1: [1, 2, 3],
      2: [4, 5, 6],
      3: [7, 8, 9],
    };
    return rowsMapping[row].map((n) => [face, n, color]);
  }

  private getMostVisibleSection() {
    const viewportTop = 0;
    const viewportBottom = window.innerHeight;

    return (
      [...this.sections]
        .map((s) => s.nativeElement)
        .map((section, index) => {
          const rect = section.getBoundingClientRect();

          const visibleTop = Math.max(rect.top, viewportTop);
          const visibleBottom = Math.min(rect.bottom, viewportBottom);

          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const sectionHeight = rect.height;

          const visibility = sectionHeight > 0 ? visibleHeight / sectionHeight : 0;

          return {
            section,
            index,
            visibility,
          };
        })
        // highest visibility first, for equal visibility, later section wins.
        .sort((a, b) => {
          if (a.visibility !== b.visibility) {
            return b.visibility - a.visibility;
          }

          return b.index - a.index;
        })[0]
    );
  }

  public toggleSidebar(): void {
    this.sidebarEl.nativeElement.classList.toggle('sidebar--opened');
  }

  public hideSidebar(): void {
    this.sidebarEl.nativeElement.classList.remove('sidebar--opened');
  }
}
