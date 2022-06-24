import { TestBed } from '@angular/core/testing';

import { ServiceTodoListService } from './service-todo-list.service';

describe('ServiceTodoListService', () => {
  let service: ServiceTodoListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceTodoListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
