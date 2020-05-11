import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard-bak',
    loadChildren: () => import('./modules/dashboard-bak/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'surveys',
    loadChildren: () => import('./modules/surveys/surveys.module').then( m => m.SurveysPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
