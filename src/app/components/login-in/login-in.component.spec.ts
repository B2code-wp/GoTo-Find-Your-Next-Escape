import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginInComponent } from './login-in.component';

describe('LoginInComponent', () => {
  let component: LoginInComponent;
  let fixture: ComponentFixture<LoginInComponent>;
  let value = 42;
console.log(value);


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginInComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
expect(value).to.be.true;   // strict true
expect(value).to.be.ok;     // truthy check

  });
});
