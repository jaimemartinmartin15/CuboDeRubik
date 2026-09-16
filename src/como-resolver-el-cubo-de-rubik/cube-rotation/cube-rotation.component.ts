import { Component, Input } from '@angular/core';
import { CuboDeRubikSvgComponent } from '../../svg-output/cubo-de-rubik.component';

type SideToRotate = 'left' | 'right' | 'top' | 'bottom' | 'front' | 'cube';

@Component({
  selector: 'app-cube-rotation',
  templateUrl: './cube-rotation.component.html',
  styleUrls: ['./cube-rotation.component.scss'],
  imports: [CuboDeRubikSvgComponent],
})
export class CubeRotationComponent {
  @Input()
  public sideToRotate: SideToRotate;

  public COLOR_MAPPING: Record<SideToRotate, string> = {
    left: '#00BFA5',
    right: '#2979FF',
    top: '#7C4DFF',
    bottom: '#FF6D00',
    front: '#E91E63',
    cube: '#FFC107',
  };
}
