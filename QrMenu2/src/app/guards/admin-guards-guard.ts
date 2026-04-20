import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { map, catchError, of } from 'rxjs';

export const adminGuardsGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // Her zaman backend’e soruyoruz (cookie ile)
  return authService.me().pipe(
    map(user => {
      return true; // /me başarılı → geç
    }),
    catchError(err => {
      // /me başarısız → login sayfasına yönlendir
      return of(router.createUrlTree(['/login']));
    })
  );
};