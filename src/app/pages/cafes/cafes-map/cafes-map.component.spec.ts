import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CafesMapComponent } from './cafes-map.component';
import { SharedModule } from '../../../shared/shared.module';
import { CafesService } from '../../../shared/service';
import { HttpClient } from '@angular/common/http';
import { HttpClientMock } from '../../../_mock-backend/http/http-client.mock';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../../../../environments/environment';

describe('CafesMapComponent', () => {
  let component: CafesMapComponent;
  let fixture: ComponentFixture<CafesMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AgmCoreModule.forRoot({apiKey: environment.googleApiKey}) ],
      declarations: [ CafesMapComponent ],
      providers: [
        CafesService,
        { provide: HttpClient, useClass: HttpClientMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CafesMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
