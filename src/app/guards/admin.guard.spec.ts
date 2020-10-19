import { TestBed, async, inject } from '@angular/core/testing';

import { AdminGuard } from './admin.guard';

describe('AdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminGuard]
    });
  });

  it('should ...', inject([AdminGuard], (guard: AdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
// import { TestBed, async, inject } from '@angular/core/testing';

// import { AuthGuard } from './auth.guard';

// describe('AuthGuard', () => {
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [AuthGuard]
//     });
//   });

//   it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
//     expect(guard).toBeTruthy();
//   }));
// });
