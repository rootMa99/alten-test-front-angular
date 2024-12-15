import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  imports: [FormsModule],
})
export class ContactFormComponent {
  email: string = '';
  message: string = '';
  showSuccessMessage: boolean = false;

  onSubmit(form: any) {
    if (form.valid) {
      this.showSuccessMessage = true;

      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 5000);

      form.resetForm();
      this.email = '';
      this.message = '';
    }
  }
}
