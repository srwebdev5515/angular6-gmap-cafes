import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CafesListComponent } from './cafes-list.component';
import { FormsModule } from '@angular/forms';
import { CafesService } from '../../../shared/service';
import { HttpClient } from '@angular/common/http';
import { HttpClientMock } from '../../../_mock-backend/http/http-client.mock';

describe('CafesListComponent', () => {
  let component: CafesListComponent;
  let fixture: ComponentFixture<CafesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ CafesListComponent ],
      providers: [
        CafesService,
        { provide: HttpClient, useClass: HttpClientMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CafesListComponent);
    component = fixture.componentInstance;
    component.cafes = [
      {
        name: 'Cafe 1',
        location: {
          latitude: 100,
          longitude: 100
        },
        placeId: 'Cafe-1',
        openingHours: null
      },
      {
        name: 'Cafe 2',
        location: {
          latitude: 101,
          longitude: 101
        },
        placeId: 'Cafe-2',
        openingHours: null
      }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct cafe name', () => {
    expect(fixture.nativeElement.querySelectorAll('.name')[1].innerHTML).toEqual('Cafe 2');
  });
});
