import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EBookComponent } from '../e-book/e-book.component';

@Component({
  selector: 'app-allmaterials',
  standalone: true,
  imports: [RouterModule,EBookComponent],
  templateUrl: './allmaterials.component.html',
  styleUrl: './allmaterials.component.scss'
})
export class AllmaterialsComponent {

}
