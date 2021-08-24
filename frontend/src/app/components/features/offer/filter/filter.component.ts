import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Make } from 'src/app/model/make.model';
import { DataService } from 'src/app/services/data.service';
import { MakeService } from 'src/app/services/make.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  val = "asd"
  subscription: Subscription;

  page: number = 0;

  states: string[] = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  makes: Make[] = [];
  make: Make = new Make({ id: 0, name: "None" });

  constructor(
    private data: DataService,
    private makeService: MakeService,
  ) { }

  ngOnInit(): void {
    this.subscription = this.data.currentMessage.subscribe(message => this.val = message)
    
    this.loadAllMakes();
  }

  loadAllMakes() {
    this.makeService.getAll(this.page).subscribe(
      res => {
        this.makes = res.content
        console.log(this.makes)
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Send message to other component
   */
  send() {
    this.data.changeMessage(this.val)
  }

}
