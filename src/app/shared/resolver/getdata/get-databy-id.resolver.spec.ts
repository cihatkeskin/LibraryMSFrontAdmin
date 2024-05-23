import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { getDatabyIdResolver } from './get-databy-id.resolver';

describe('getDatabyIdResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => getDatabyIdResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
