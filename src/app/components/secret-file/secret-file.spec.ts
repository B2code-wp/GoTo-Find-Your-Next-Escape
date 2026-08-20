import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretFile } from './secret-file';

describe('SecretFile', () => {
  let component: SecretFile;
  let fixture: ComponentFixture<SecretFile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecretFile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecretFile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
