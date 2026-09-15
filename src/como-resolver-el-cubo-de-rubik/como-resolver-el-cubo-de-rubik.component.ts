import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Inject,
  PLATFORM_ID,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArrowSvgComponent } from '../svg-output/arrow.component';
import { BurgerSvgComponent } from '../svg-output/burger.component';
import { CircularArrowSvgComponent } from '../svg-output/circular-arrow.component';
import { CuboDeRubikSvgComponent } from '../svg-output/cubo-de-rubik.component';
import { CubeRotationComponent } from './cube-rotation/cube-rotation.component';

@Component({
  selector: 'app-como-resolver-el-cubo-de-rubik',
  templateUrl: './como-resolver-el-cubo-de-rubik.component.html',
  styleUrls: ['./como-resolver-el-cubo-de-rubik.component.scss'],
  imports: [
    ArrowSvgComponent,
    BurgerSvgComponent,
    CircularArrowSvgComponent,
    CuboDeRubikSvgComponent,
    CubeRotationComponent,
    AsyncPipe,
  ],
})
export class ComoResolverElCuboDeRubikComponent implements AfterViewInit {
  @ViewChild('sidebar')
  public sidebarEl: ElementRef<HTMLElement>;

  @ViewChildren('stepLink')
  public stepLinks: QueryList<ElementRef<HTMLAnchorElement>>;

  @ViewChildren('stepSection')
  public sections: QueryList<ElementRef<HTMLElement>>;

  @HostBinding('style.--menu-break-point')
  public MENU_BREAKPOINT: string = '1110px';

  public readonly COLORS = {
    WHITE: '#FFFFFF',
    YELLOW: '#FFFF00',
    BLUE: '#0000FF',
    GREEN: '#4bb911',
    RED: '#FF0000',
    ORANGE: '#FFA500',
  };

  public showTopBar$: Observable<boolean>;

  public constructor(
    @Inject(PLATFORM_ID) private readonly platformId: object,
    breakpointObserver: BreakpointObserver,
  ) {
    this.showTopBar$ = breakpointObserver
      .observe(`(max-width: ${this.MENU_BREAKPOINT})`)
      .pipe(map((result) => result.matches));
  }

  public ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // activates the current link in the nav while scrolling to the section
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          const id = entry.target.id;
          this.stepLinks.forEach((link) => {
            link.nativeElement.classList.toggle('active', link.nativeElement.hash === `#${id}`);
          });
        }
      },
      { threshold: 1 },
    );

    this.sections.forEach((section) => observer.observe(section.nativeElement));
  }

  public toggleSidebar(): void {
    this.sidebarEl.nativeElement.classList.toggle('sidebar--opened');
  }

  public hideSidebar(): void {
    this.sidebarEl.nativeElement.classList.remove('sidebar--opened');
  }
}
