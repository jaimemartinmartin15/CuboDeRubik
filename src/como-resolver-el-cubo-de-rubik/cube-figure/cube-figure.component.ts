import { Component, HostListener, Input, signal } from '@angular/core';
import { CuboDeRubikSvgComponent } from '../../svg-output/cubo-de-rubik.component';
import { ExpandedRubikCubeSvgComponent } from '../../svg-output/expanded-rubik-cube.component';

type SquareToPaint = [face: number, square: number, color: string];

const DEFAULT_COLOR = '#dfdfdfff';

@Component({
  selector: 'app-cube-figure',
  templateUrl: './cube-figure.component.html',
  styleUrls: ['./cube-figure.component.scss'],
  imports: [CuboDeRubikSvgComponent, ExpandedRubikCubeSvgComponent],
})
export class CubeFigureComponent {
  public static showExpanded = signal<boolean>(false);

  @Input()
  public squaresToPaint: SquareToPaint[] = [];

  @HostListener('click')
  public toggleView(): void {
    CubeFigureComponent.showExpanded.update((v) => !v);
  }

  public get isExpandedView(): boolean {
    return CubeFigureComponent.showExpanded();
  }

  public getSquareColor(face: number, square: number): string {
    const squareToPaint = this.squaresToPaint.find((f) => f[0] === face && f[1] === square);
    if (squareToPaint) return squareToPaint[2];
    return DEFAULT_COLOR;
  }
}
