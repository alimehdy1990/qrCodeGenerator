import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';

import * as html2pdf from 'html2pdf.js'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  file: any;
  @ViewChild('content') content: ElementRef;

  csvRecords: any[] = [];
  header = true;
  finalArray = {};
  constructor(private ngxCsvParser: NgxCsvParser) { }

  ngOnInit(): void {
  }


  onChangeFile(event) {
    this.csvRecords = [];
    const files = event.srcElement.files;

    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => {

        //console.log('Result', result);
        this.csvRecords = result;
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });
      console.log(this.csvRecords)
  }
  save2PDF() {
    let data = document.getElementById('content');

    var opt = {
      margin: 1,
      filename: 'qrcodes.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'cm', format: 'letter', orientation: 'portrait' },
      pagebreak: { mode: 'avoid-all', afterEach: '.pagebreak' }

    };
    html2pdf().from(data).set(opt).save();
  }
  reset() {
    this.csvRecords = [];
  }
}
