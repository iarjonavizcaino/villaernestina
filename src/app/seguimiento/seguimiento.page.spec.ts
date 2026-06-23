import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { CleaningService } from '../services/cleaning.service';
import { SeguimientoPage } from './seguimiento.page';

describe('SeguimientoPage', () => {
  let component: SeguimientoPage;
  let fixture: ComponentFixture<SeguimientoPage>;

  const mockCleaningService = {
    getCleanings: () => of([]),
    addCleaning: () => Promise.resolve(),
    removeCleaning: () => Promise.resolve()
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SeguimientoPage ],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: CleaningService, useValue: mockCleaningService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SeguimientoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
