import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AppService } from './app.service';

interface DataType {
  DataText: string;
  DataValue: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CommonModule, FormsModule],
  providers: [AppService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  selectedGender: DataType | undefined;
  selectedBloodGroup: DataType | undefined;
  bloodGroups: DataType[] = [];
  genders: DataType[] = [];
  isLoading: boolean = true;
  constructor(private appService: AppService) {
    this.appService.getData().then((res: any) => {
      this.isLoading = false;
      this.bloodGroups = res.JSon1;
      this.genders = res.JSon0;
    });
  }

  onGenderChange(value: string) {
    console.log(value);
    this.selectedGender = this.genders.find(
      (gender) => gender.DataValue === value
    );
  }

  onBloodGroupChange(value: string) {
    this.selectedBloodGroup = this.bloodGroups.find(
      (group) => group.DataValue == value
    );
  }
}
