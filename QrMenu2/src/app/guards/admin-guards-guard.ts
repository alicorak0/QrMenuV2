import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { AuthService } from '../services/auth-service';
import { map, catchError, of } from 'rxjs';

export const adminGuardsGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const platformId = inject(PLATFORM_ID);

  // SSR sırasında browser cookie context'i dogrudan tasinmadigi icin
  // server tarafinda login'e redirect etmek yerine kontrolu browser'a birak.
  if (isPlatformServer(platformId)) {
    return of(true);
  }

  // Her zaman backend’e soruyoruz (cookie ile)
  return authService.me().pipe(
    map(() => {
      return true; // /me başarılı → geç
    }),
    catchError(() => {
      // /me başarısız → login sayfasına yönlendir
      return of(router.createUrlTree(['/login']));
    })
  );
};