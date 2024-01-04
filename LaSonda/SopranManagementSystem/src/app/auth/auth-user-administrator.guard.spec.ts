import { TestBed } from '@angular/core/testing';

import { AuthUserAdministratorGuard } from './auth-user-administrator.guard';

describe('AuthUserAdministratorGuard', () => {
  let guard: AuthUserAdministratorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthUserAdministratorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
