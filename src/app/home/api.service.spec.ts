import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';


describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should list all the filters by filtername',
    inject([HttpTestingController],
      (httpMock: HttpTestingController) => {
        service.listFilterByFilterName('c').subscribe((res) => {
          expect(res.drinks.length).toBeGreaterThan(1);
        });
        const mockRequest = httpMock.expectOne(`${environment.apiUrl}/list.php?c=list`);
        expect(mockRequest.request.method).toEqual('GET');
      })
  );

  it('should list all the drinks by filter',
    inject([HttpTestingController],
      (httpMock: HttpTestingController) => {
        service.fetchDrinksBySelectedFilter('c', 'Cocktail').subscribe((res) => {
          expect(res.drinks.length).toBeGreaterThan(1);
        });
        const mockRequest = httpMock.expectOne(`${environment.apiUrl}/filter.php?c=Cocktail`);
        expect(mockRequest.request.method).toEqual('GET');
      })
  );

  it('should search drinks with a searchvalue',
    inject([HttpTestingController],
      (httpMock: HttpTestingController) => {
        service.searchDrinks('Cocktail').subscribe((res) => {
          expect(res.drinks.length).toBeGreaterThan(1);
        });
        const mockRequest = httpMock.expectOne(`${environment.apiUrl}/search.php?s=Cocktail`);
        expect(mockRequest.request.method).toEqual('GET');
      })
  );

  it('should search drinks with a letter of first word',
    inject([HttpTestingController],
      (httpMock: HttpTestingController) => {
        service.searchDrinksByFirstLetter('A').subscribe((res) => {
          expect(res.drinks.length).toBeGreaterThan(1);
        });
        const mockRequest = httpMock.expectOne(`${environment.apiUrl}/search.php?f=A`);
        expect(mockRequest.request.method).toEqual('GET');
      })
  );

  it('should fetch drink by ID',
    inject([HttpTestingController],
      (httpMock: HttpTestingController) => {
        service.fetchDrinkById('15346').subscribe((res) => {
          expect(res.drinks.length).toBeGreaterThan(1);
        });
        const mockRequest = httpMock.expectOne(`${environment.apiUrl}/lookup.php?i=15346`);
        expect(mockRequest.request.method).toEqual('GET');
      })
  );
});
