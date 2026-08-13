import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface BreadcrumbItemVM {
  label: string;
  /** Sin link ⇒ es la página actual */
  link?: string;
}

/** Migas de pan de navegación. */
@Component({
  selector: 'app-breadcrumbs',
  imports: [RouterLink],
  templateUrl: './breadcrumbs.html',
  styleUrl: './breadcrumbs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Breadcrumbs {
  readonly items = input.required<BreadcrumbItemVM[]>();
}
