import { CanActivateFn, Router } from '@angular/router';
import { _isAuthenticated, AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';
import { AlertifyService, MessageType, Position } from '../services/alertify/alertify.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService)
  const alertfy = inject(AlertifyService)
  const router = inject(Router)
  
  auth.TokenCheck();
  if (!_isAuthenticated) {
    router.navigate(['/login']);
    alertfy.message('Please Login', { messageType: MessageType.Warning, position: Position.BottomCenter, delay: 2 });
  }
  return true;
};
