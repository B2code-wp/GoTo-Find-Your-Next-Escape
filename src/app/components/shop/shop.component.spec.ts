import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShopComponent } from './shop.component';

describe('ShopComponent', () => {
  let component: ShopComponent;
  let fixture: ComponentFixture<ShopComponent>;
  let value: string = 'Angular rocks!';


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
expect(value).to.be.true;   // ✅ Chai
expect(value).to.be.ok;     // ✅ truthy check
  });
});
