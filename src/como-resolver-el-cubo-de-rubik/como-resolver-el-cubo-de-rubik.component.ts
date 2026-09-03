import { Component } from '@angular/core';
import { CuboDeRubikSvgComponent } from '../svg-output/cubo-de-rubik.component';

@Component({
  selector: 'app-como-resolver-el-cubo-de-rubik',
  templateUrl: './como-resolver-el-cubo-de-rubik.component.html',
  styleUrls: ['./como-resolver-el-cubo-de-rubik.component.scss'],
  imports: [CuboDeRubikSvgComponent],
})
export class ComoResolverElCuboDeRubikComponent {
  public readonly COLORS = {
    WHITE: '#FFFFFF',
    YELLOW: '#FFFF00',
    BLUE: '#0000FF',
    GREEN: '#4bb911',
    RED: '#FF0000',
    ORANGE: '#FFA500',

    ARROW: '#ffffff',
    SELECTED: '#ffffff',
    SELECTED_LIGHT: '#b0d5ff',
  };
  public readonly COLORS_DARK = {
    WHITE: '#e6e6e6',
    YELLOW: '#F5E6A8',
    BLUE: '#A8C4E0',
    GREEN: '#B3D1B5',
    RED: '#E3A9A9',
    ORANGE: '#F2C39B',
  };
}
