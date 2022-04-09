import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-qeustion',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  public name !: string;
  public questionList:any = [];
  public currentQuestion = 0;
  public points : number = 0;
  isCorrect = false;
  counter = 60;
  correctAnswers = 0;
  incorrectAnswers = 0;
  interval$:any;
  progress:string="0";
  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('name')!
    this.getAllQuestions()
    this.startCounter()
  }
  getAllQuestions(){
    this.questionService.getQuestion()
    .subscribe(res => {
      this.questionList = res.questions
    })   
  }
  getNextQuestion(){
    this.currentQuestion == 9 ? this.currentQuestion = 9 : this.currentQuestion++
  }
  getPreviousQuestion(){
    this.currentQuestion == 0 ? this.currentQuestion = 0 : this.currentQuestion--
  }
  answer(currentQuestionNumber:number,option:any){
    if(option.correct){
      this.points++
      this.correctAnswers++
    }
    else{
      this.incorrectAnswers++
    }
    this.currentQuestion == 9 ? this.currentQuestion = 9 : this.currentQuestion++;
    this.getProgressPercent();
    this.resetCounter();
  }
  startCounter(){
    this.interval$ = interval(1000)
    .subscribe(val =>{
      if(this.counter === 0){
        this.getNextQuestion(); 
        this.counter=60;
        this.incorrectAnswers++;
      }
      this.counter--
    })
    setTimeout(() => {
      this.interval$.unsubscribe();
    },600000)
  }
  stopCounter(){
    this.interval$.unsubscribe();
    this.counter = 0
  }
  resetCounter(){
    this.stopCounter();
    this.counter = 60;
    this.startCounter()    
  }
  resetQuiz(){
    this.resetCounter();
    this.currentQuestion = 0;
    this.points = 0;
    this.correctAnswers = 0;
    this.incorrectAnswers = 0;
    this.progress="0"
  }
  getProgressPercent(){
    this.progress = (((this.currentQuestion+1)/this.questionList.length)*100).toString()
    return this.progress
  }
  isComplatedQuiz(){
    return this.currentQuestion == 9 ? true : false
  }
}
