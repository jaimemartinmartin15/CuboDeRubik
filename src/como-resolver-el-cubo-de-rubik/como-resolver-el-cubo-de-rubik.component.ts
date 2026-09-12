import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ArrowSvgComponent } from '../svg-output/arrow.component';
import { CircularArrowSvgComponent } from '../svg-output/circular-arrow.component';
import { CuboDeRubikSvgComponent } from '../svg-output/cubo-de-rubik.component';
import { CubeRotationComponent } from './cube-rotation/cube-rotation.component';

@Component({
  selector: 'app-como-resolver-el-cubo-de-rubik',
  templateUrl: './como-resolver-el-cubo-de-rubik.component.html',
  styleUrls: ['./como-resolver-el-cubo-de-rubik.component.scss'],
  imports: [
    CuboDeRubikSvgComponent,
    ArrowSvgComponent,
    CircularArrowSvgComponent,
    CubeRotationComponent,
  ],
})
export class ComoResolverElCuboDeRubikComponent implements AfterViewInit {
  @ViewChildren('stepLink')
  public stepLinks: QueryList<ElementRef<HTMLAnchorElement>>;

  @ViewChildren('stepSection')
  public sections: QueryList<ElementRef<HTMLElement>>;

  public readonly COLORS = {
    WHITE: '#FFFFFF',
    YELLOW: '#FFFF00',
    BLUE: '#0000FF',
    GREEN: '#4bb911',
    RED: '#FF0000',
    ORANGE: '#FFA500',
  };

  public constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {}

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
}
