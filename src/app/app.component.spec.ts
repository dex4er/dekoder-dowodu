import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { TestBed } from '@angular/core/testing'

import { Platform } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'

import { AppComponent } from './app.component'

describe('AppComponent', () => {

  let statusBarSpy: any, splashScreenSpy: any, platformReadySpy: any, platformSpy: any

  beforeEach(async () => {
    statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault'])
    splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide'])
    platformReadySpy = Promise.resolve()
    platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy })

    void TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: StatusBar, useValue: statusBarSpy },
        { provide: SplashScreen, useValue: splashScreenSpy },
        { provide: Platform, useValue: platformSpy }
      ]
    }).compileComponents()
  })

  it('should create the app', async () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance
    void expect(app).toBeTruthy()
  })

  it('should initialize the app', async () => {
    TestBed.createComponent(AppComponent)
    void expect(platformSpy.ready).toHaveBeenCalled()
    await platformReadySpy
    void expect(statusBarSpy.styleDefault).toHaveBeenCalled()
    void expect(splashScreenSpy.hide).toHaveBeenCalled()
  })

  // TODO: add more tests!

})
