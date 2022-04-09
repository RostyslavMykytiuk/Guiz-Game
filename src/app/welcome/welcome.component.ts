import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor() { }
  form!: FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('',[Validators.required , Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)])
    })
  }
  startQuiz(){
    localStorage.setItem("name",this.form.get('name')?.value)
  }

}
