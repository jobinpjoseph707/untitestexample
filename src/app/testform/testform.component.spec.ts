import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TestformComponent } from './testform.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('TestformComponent', () => {
  let component: TestformComponent;
  let fixture: ComponentFixture<TestformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestformComponent, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TestformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty fields', () => {
    expect(component.login.get('username')?.value).toBe('');
    expect(component.login.get('password')?.value).toBe('');
  });

  it('should have username and password fields', () => {
    const usernameInput = fixture.debugElement.query(By.css('#username'));
    const passwordInput = fixture.debugElement.query(By.css('input[type="password"]'));
    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  it('should show validation errors when fields are empty', () => {
    component.login.markAllAsTouched();
    fixture.detectChanges();
    const usernameErrors = fixture.debugElement.queryAll(By.css('#username + div.alert'));
    const passwordErrors = fixture.debugElement.queryAll(By.css('input[type="password"] + div.alert'));
    expect(usernameErrors.length).toBe(1);
    expect(passwordErrors.length).toBe(1);
    expect(usernameErrors[0].nativeElement.textContent).toContain('Name is required');
    expect(passwordErrors[0].nativeElement.textContent).toContain('Name is required');
  });

  it('should show minlength error for username', () => {
    component.login.get('username')?.setValue('abc');
    component.login.get('username')?.markAsTouched();
    fixture.detectChanges();
    const usernameErrors = fixture.debugElement.queryAll(By.css('#username + div.alert'));
    expect(usernameErrors.length).toBe(1);
    expect(usernameErrors[0].nativeElement.textContent).toContain('minmum 4 charaters is required');
  });

  it('should show minlength error for password', () => {
    component.login.get('password')?.setValue('1234567');
    component.login.get('password')?.markAsTouched();
    fixture.detectChanges();
    const passwordErrors = fixture.debugElement.queryAll(By.css('input[type="password"] + div.alert'));
    expect(passwordErrors.length).toBe(1);
    expect(passwordErrors[0].nativeElement.textContent).toContain('minmum 4 charaters is required');
  });

  it('should not show errors when form is valid', () => {
    component.login.setValue({
      username: 'validuser',
      password: 'validpassword'
    });
    component.login.markAllAsTouched();
    fixture.detectChanges();
    const errors = fixture.debugElement.queryAll(By.css('.alert'));
    expect(errors.length).toBe(0);
  });

  it('should call onsubmit method when form is submitted', () => {
    spyOn(component, 'onsubmit');
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);
    expect(component.onsubmit).toHaveBeenCalled();
  });

  it('should log form values on submit', () => {
    spyOn(console, 'log');
    component.login.setValue({
      username: 'testuser',
      password: 'testpassword'
    });
    component.onsubmit();
    expect(console.log).toHaveBeenCalledWith({ username: 'testuser', password: 'testpassword' });
  });

});
